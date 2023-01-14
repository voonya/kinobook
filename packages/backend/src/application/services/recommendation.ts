import { Movie, Viewed } from '@domain/models';
import {
  IMovieParamsWeights,
  IEntityParam,
  IMovieFilters,
  IRecommendationFilters,
  PaginatedEntity,
} from '@domain/contracts';
import {
  IMovieRepository,
  IViewedRepository,
  IBookmarkRepository,
  IGenreRepository,
  ICountryRepository,
  IActorRepository,
  IDirectorRepository,
} from '@domain/repository';
import { IRecommendationService, IElasticService } from '@domain/services';

const ACTUALLITY_MULTIPLIER = 1.5;
const DEFAULT_MULTIPLIER = 1;

const ACTUALLITY_DAYS = 7;

const GENRE_MULTIPLIER = 2.5;
const TITLE_MULTIPLIER = 2;
const DIRECTOR_MULTIPLIER = 1.8;
const ACTOR_MULTIPLIER = 1.8;
const DESCRIPTION_MULTIPLIER = 1.2;
const COUNTRY_MULTIPLIER = 1.1;

const COUNT_VIEWED_CONSIDER = 20;

const MULTIPLIER_SUM =
  GENRE_MULTIPLIER +
  TITLE_MULTIPLIER +
  DESCRIPTION_MULTIPLIER +
  DIRECTOR_MULTIPLIER +
  ACTOR_MULTIPLIER +
  COUNTRY_MULTIPLIER;

interface IWeightsAccumulator {
  title: Record<string, number>;
  description: Record<string, number>;
  genres: Record<string, number>;
  countries: Record<string, number>;
  actors: Record<string, number>;
  directors: Record<string, number>;
}

export class RecommendationService implements IRecommendationService {
  constructor(
    private viewedRepository: IViewedRepository,
    private movieRepository: IMovieRepository,
    private bookmarkRepository: IBookmarkRepository,
    private genreRepository: IGenreRepository,
    private countryRepository: ICountryRepository,
    private actorRepository: IActorRepository,
    private directorRepository: IDirectorRepository,
    private elasticService: IElasticService,
  ) {}

  async getSimilarMovies(movieId: string, count: number): Promise<Movie[]> {
    const recommendIds = await this.elasticService.getSimilarMovie(
      movieId,
      count,
    );
    const movies = [];

    for (const movieId of recommendIds) {
      const movie = await this.movieRepository.getById(movieId);
      movies.push(movie);
    }

    return movies;
  }

  async getUserRecommendations(
    userId: string,
    filters?: IMovieFilters,
  ): Promise<PaginatedEntity<Movie[]>> {
    const filtersElastic = await this.convertFilters(filters);
    const views = (
      await this.viewedRepository.getUserViewed(userId, {
        limit: COUNT_VIEWED_CONSIDER,
      })
    ).data;
    let recommendRes;

    if (views.length < 5) {
      recommendRes = await this.createRecommendationsColdStart(
        userId,
        views,
        filtersElastic,
      );
    } else {
      recommendRes = await this.createRecommendations(views, filtersElastic);
    }
    const movies = [];

    for (const movieId of recommendRes.data) {
      const movie = await this.movieRepository.getById(movieId);
      movies.push(movie);
    }

    return { data: movies, count: recommendRes.count };
  }

  private async createRecommendationsColdStart(
    userId: string,
    views: Viewed[],
    filters?: IRecommendationFilters,
  ) {
    const moviesIdsInBookmarks =
      await this.bookmarkRepository.getMoviesIdInUserBookmarks(userId);

    const recommendIds = await this.elasticService.getMoviesColdstart(
      moviesIdsInBookmarks,
      views.map((el) => el.movie.id),
      filters,
    );

    return recommendIds || [];
  }

  private async createRecommendations(
    views: Viewed[],
    filters?: IRecommendationFilters,
  ) {
    const weights: IWeightsAccumulator = {
      title: {},
      description: {},
      genres: {},
      countries: {},
      actors: {},
      directors: {},
    };

    for (const viewed of views) {
      this.processViewed(viewed, weights);
    }

    const mappedWeights = Object.keys(weights).map((el) => [
      el,
      Object.keys(weights[el]).map(
        (key) => ({ value: key, weight: weights[el][key] } as IEntityParam),
      ),
    ]);

    const paramsWeights: IMovieParamsWeights =
      Object.fromEntries(mappedWeights);
    const viewedMovieIds = views.map((el) => el.movie.id);

    const recommendIds = await this.elasticService.getMoviesFunctionScore(
      paramsWeights,
      viewedMovieIds,
      filters,
    );

    return recommendIds || [];
  }

  private async convertFilters(filters: IMovieFilters) {
    const filtersConverted: IRecommendationFilters = { ...filters };

    if (filters.genresId) {
      filtersConverted.genres = [];
      for (const genreId of filters.genresId) {
        const genre = await this.genreRepository.getById(genreId);
        if (genre) {
          filtersConverted.genres.push(genre.name);
        }
      }
    }

    if (filters.countriesId) {
      filtersConverted.countries = [];
      for (const countryId of filters.countriesId) {
        const country = await this.countryRepository.getById(countryId);
        if (country) {
          filtersConverted.countries.push(country.name);
        }
      }
    }

    if (filters.actorsId) {
      filtersConverted.actors = [];
      for (const actorId of filters.actorsId) {
        const actor = await this.actorRepository.getById(actorId);
        if (actor) {
          filtersConverted.actors.push(`${actor.name} ${actor.surname}`);
        }
      }
    }

    if (filters.directorsId) {
      filtersConverted.directors = [];
      for (const directorId of filters.directorsId) {
        const director = await this.directorRepository.getById(directorId);
        if (director) {
          filtersConverted.directors.push(
            `${director.name} ${director.surname}`,
          );
        }
      }
    }

    return filtersConverted;
  }

  private processViewed(viewed: Viewed, accumulator: IWeightsAccumulator) {
    const {
      rate,
      movie: { title, description, genres, directors, actors, countries },
    } = viewed;

    const weights = this.calcWeights(
      rate - 2.5,
      genres.length,
      directors.length,
      actors.length,
      countries.length,
    );

    const actuallityDate = new Date();
    actuallityDate.setDate(actuallityDate.getDate() - ACTUALLITY_DAYS);

    const additionalMultiplier =
      actuallityDate < viewed.createdAt
        ? ACTUALLITY_MULTIPLIER
        : DEFAULT_MULTIPLIER;

    Object.keys(weights).forEach((key) => {
      weights[key] *= additionalMultiplier;
    });

    accumulator.title[title] = accumulator.title[title] ?? 0 + weights.title;
    accumulator.description[description] =
      accumulator.description[description] ?? 0 + weights.description;

    genres
      .map((el) => el.name)
      .forEach((genre) => {
        accumulator.genres[genre] =
          accumulator.genres[genre] ?? 0 + weights.genre;
      });

    countries
      .map((el) => el.name)
      .forEach((country) => {
        accumulator.countries[country] =
          accumulator.countries[country] ?? 0 + weights.country;
      });

    directors
      .map((el) => `${el.name} ${el.surname}`)
      .forEach((director) => {
        accumulator.directors[director] =
          accumulator.directors[director] ?? 0 + weights.director;
      });

    actors
      .map((el) => `${el.name} ${el.surname}`)
      .forEach((actor) => {
        accumulator.actors[actor] =
          accumulator.actors[actor] ?? 0 + weights.actor;
      });
  }

  private calcWeights(
    rate: number,
    genresCount: number,
    directorsCount: number,
    actorsCount: number,
    countriesCount: number,
  ) {
    return {
      title: (rate * TITLE_MULTIPLIER) / MULTIPLIER_SUM,
      description: (rate * DESCRIPTION_MULTIPLIER) / MULTIPLIER_SUM,
      genre: (rate * GENRE_MULTIPLIER) / MULTIPLIER_SUM / genresCount,
      director: (rate * DIRECTOR_MULTIPLIER) / MULTIPLIER_SUM / directorsCount,
      actor: (rate * ACTOR_MULTIPLIER) / MULTIPLIER_SUM / actorsCount,
      country: (rate * COUNTRY_MULTIPLIER) / MULTIPLIER_SUM / countriesCount,
    };
  }
}

import { MovieNotFoundError } from '@application/exeptions';
import type { MoviePricing, Viewed } from '@domain/models';
import { Movie } from '@domain/models';
import { File } from '@domain/models';
import type {
  IActorRepository,
  ICountryRepository,
  IGenreRepository,
  IMovieRepository,
  IDirectorRepository,
  IViewedRepository,
} from '@domain/repository';
import type {
  IElasticService,
  IFileService,
  IMovieService,
} from '@domain/services';
import {
  CreateMovie,
  PaginatedEntity,
  IMovieFilters,
  IPagination,
} from '@domain/contracts';
import { BaseNotFoundError } from '@application/exeptions/base';
import { getMegogoPrice, getMegogoLink } from '@application/helpers';

export class MovieService implements IMovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private genreRepository: IGenreRepository,
    private actorRepository: IActorRepository,
    private directorRepository: IDirectorRepository,
    private countryRepository: ICountryRepository,
    private viewRepository: IViewedRepository,
    private fileService: IFileService,
    private elasticService: IElasticService,
  ) {}

  async getById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.getById(id);

    if (!movie) {
      throw new MovieNotFoundError();
    }

    return movie;
  }

  async createMovie(data: CreateMovie, poster?: File): Promise<Movie> {
    const { genres, actors, directors, countries } = data;

    const mappedEntities = await this.mapRelatedEntities(
      genres,
      actors,
      directors,
      countries,
    );

    if (poster) {
      const fileLink = await this.fileService.saveFile(poster);
      data.poster = fileLink;
    }

    const megogoLink = data.megogoLink ?? (await getMegogoLink(data.title));

    const created = await this.movieRepository.create({
      ...data,
      ...mappedEntities,
      megogoLink,
    });

    if (created) {
      const { poster: posterDb, ...movieWithoutPoster } = created;

      this.elasticService.createMovie(movieWithoutPoster);
    }

    return created;
  }

  async updateById(
    id: string,
    data: CreateMovie,
    poster?: File,
  ): Promise<Movie> {
    const movie = await this.getById(id);

    delete movie.averageRate;
    delete movie.countVotes;

    const { genres, actors, directors, countries } = data;

    const mappedEntities = await this.mapRelatedEntities(
      genres,
      actors,
      directors,
      countries,
    );

    if (
      (!data.poster || (data.poster && poster)) &&
      movie.poster &&
      !movie.poster.startsWith('foreign')
    ) {
      await this.fileService.deleteFile(movie.poster);
    }

    if (data.poster && poster) {
      const fileLink = await this.fileService.saveFile(poster);
      data.poster = fileLink;
    }

    const megogoLink = data.megogoLink ?? (await getMegogoLink(data.title));

    const newMovie = {
      ...movie,
      ...data,
      ...mappedEntities,
      megogoLink,
      updatedAt: new Date(),
    };
    //console.log('new movie', newMovie);

    const updated = await this.movieRepository.updateById(id, newMovie);

    if (updated) {
      const { poster: posterDb, ...movieWithoutPoster } = updated;

      this.elasticService.updateMovie(id, movieWithoutPoster);
    }

    return updated;
  }

  async deleteById(id: string): Promise<Movie> {
    const movie = await this.getById(id);

    if (movie.poster) {
      await this.fileService.deleteFile(movie.poster);
    }

    const deleted = await this.movieRepository.deleteById(id);

    if (deleted) {
      this.elasticService.deleteMovie(id);
    }

    return deleted;
  }

  async getAll(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }

  getFiltered(filters: IMovieFilters): Promise<PaginatedEntity<Movie[]>> {
    return this.movieRepository.getFiltered(filters);
  }

  private async mapRelatedEntities(
    genresId: string[],
    actorsId: string[],
    directorsId: string[],
    countriesId: string[],
  ) {
    const mappedEntities = {
      genres: null,
      actors: null,
      directors: null,
      countries: null,
    };

    mappedEntities.genres = await Promise.all(
      genresId.map(async (genre) => {
        const genreInDb = await this.genreRepository.getById(genre);
        if (!genreInDb) {
          throw new BaseNotFoundError(`Genre ${genre} not found!`);
        }

        return genreInDb;
      }),
    );

    mappedEntities.actors = actorsId
      ? await Promise.all(
          actorsId.map(async (actor) => {
            const actorInDb = await this.actorRepository.getById(actor);
            if (!actorInDb) {
              throw new BaseNotFoundError(`Actor ${actor} not found!`);
            }

            return actorInDb;
          }),
        )
      : null;

    mappedEntities.directors = directorsId
      ? await Promise.all(
          directorsId.map(async (director) => {
            const directorInDb = await this.directorRepository.getById(
              director,
            );
            if (!directorInDb) {
              throw new BaseNotFoundError(`Director ${director} not found!`);
            }

            return directorInDb;
          }),
        )
      : null;

    mappedEntities.countries = countriesId
      ? await Promise.all(
          countriesId.map(async (country) => {
            const countryInDb = await this.countryRepository.getById(country);
            if (!countryInDb) {
              throw new BaseNotFoundError(`Country ${country} not found!`);
            }

            return countryInDb;
          }),
        )
      : null;

    return mappedEntities;
  }

  getViews(
    movieId: string,
    pagination: IPagination,
  ): Promise<PaginatedEntity<Viewed[]>> {
    return this.viewRepository.getMovieReview(movieId, pagination);
  }

  async addRateToAverageRating(
    movieId: string,
    rate: number,
    oldRate?: number,
  ): Promise<Movie> {
    const movie = await this.getById(movieId);

    const averageRate = movie.averageRate ?? 0;
    const countVotes = movie.countVotes ?? 0;

    let newCountVotes;
    let newSumRatings;

    if (!averageRate && !countVotes) {
      newSumRatings = rate;
      newCountVotes = 1;
    } else {
      newCountVotes = oldRate ? movie.countVotes : movie.countVotes + 1;
      newSumRatings =
        movie.averageRate * movie.countVotes + rate - (oldRate ?? 0);
    }

    movie.averageRate = newSumRatings / newCountVotes;
    movie.countVotes = newCountVotes;

    const updated = await this.movieRepository.updateById(movieId, movie);

    this.elasticService.updateMovie(movieId, updated);

    return updated;
  }

  async deleteRateFromAverageRating(
    movieId: string,
    rate: number,
  ): Promise<Movie> {
    const movie = await this.getById(movieId);

    const averageRate = movie.averageRate ?? 0;
    const countVotes = movie.countVotes ?? 0;

    if (!averageRate && !countVotes) {
      return movie;
    }

    movie.averageRate =
      (movie.averageRate * movie.countVotes - rate) /
      (movie.countVotes - 1 || 1);
    movie.countVotes -= 1;

    const updated = await this.movieRepository.updateById(movieId, movie);

    this.elasticService.updateMovie(movieId, updated);

    return updated;
  }

  async getPricing(movieId: string): Promise<MoviePricing[]> {
    const pricing = [];

    const movie = await this.getById(movieId);

    const megogoPrice = await getMegogoPrice(movie.megogoLink);

    if (megogoPrice) {
      pricing.push(megogoPrice);
    }

    console.log(pricing);

    return pricing;
  }
}

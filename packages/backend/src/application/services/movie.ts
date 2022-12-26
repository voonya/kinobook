import { MovieNotFoundError } from '@application/exeptions';
import type { Viewed, MovieWithRating } from '@domain/models';
import { Movie } from '@domain/models';
import { File } from '@domain/models';
import type {
  IActorRepository,
  ICountryRepository,
  IGenreRepository,
  IMovieRepository,
  IWriterRepository,
  IViewedRepository,
} from '@domain/repository';
import type { IFileService, IMovieService } from '@domain/services';
import {
  CreateMovie,
  PaginatedEntity,
  IMovieFilters,
  IPagination,
} from '@domain/contracts';
import { BaseNotFoundError } from '@application/exeptions/base';

export class MovieService implements IMovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private genreRepository: IGenreRepository,
    private actorRepository: IActorRepository,
    private writerRepository: IWriterRepository,
    private countryRepository: ICountryRepository,
    private viewRepository: IViewedRepository,
    private fileService: IFileService,
  ) {}

  async getById(id: string): Promise<MovieWithRating> {
    const movie = await this.movieRepository.getById(id);

    if (!movie) {
      throw new MovieNotFoundError();
    }

    return movie;
  }

  async createMovie(data: CreateMovie, poster?: File): Promise<Movie> {
    const { genres, actors, writers, countries } = data;

    const mappedEntities = await this.mapRelatedEntities(
      genres,
      actors,
      writers,
      countries,
    );

    if (poster) {
      const fileLink = await this.fileService.saveFile(poster);
      data.poster = fileLink;
    }

    return this.movieRepository.create({ ...data, ...mappedEntities });
  }

  async updateById(
    id: string,
    data: CreateMovie,
    poster?: File,
  ): Promise<Movie> {
    const movie = await this.getById(id);

    delete movie.averageRate;
    delete movie.countVotes;

    const { genres, actors, writers, countries } = data;

    const mappedEntities = await this.mapRelatedEntities(
      genres,
      actors,
      writers,
      countries,
    );

    if (!data.poster) {
      if (poster) {
        const fileLink = await this.fileService.saveFile(poster);
        data.poster = fileLink;
      }

      if (movie.poster) {
        await this.fileService.deleteFile(movie.poster);
      }
    }

    const newMovie = {
      ...movie,
      ...data,
      ...mappedEntities,
      updatedAt: new Date(),
    };
    console.log('new movie', newMovie);

    return this.movieRepository.updateById(id, newMovie);
  }

  async deleteById(id: string): Promise<Movie> {
    const movie = await this.getById(id);

    if (movie.poster) {
      await this.fileService.deleteFile(movie.poster);
    }

    return this.movieRepository.deleteById(id);
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
    writersId: string[],
    countriesId: string[],
  ) {
    const mappedEntities = {
      genres: null,
      actors: null,
      writers: null,
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

    mappedEntities.writers = writersId
      ? await Promise.all(
          writersId.map(async (writer) => {
            const writerInDb = await this.writerRepository.getById(writer);
            if (!writerInDb) {
              throw new BaseNotFoundError(`Writer ${writer} not found!`);
            }

            return writerInDb;
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
}

import { MovieNotFoundError } from '@application/exeptions';
import type { Movie } from '@domain/models';
import { File } from '@domain/models';
import type { IMovieRepository } from '@domain/repository';
import type { IFileService, IMovieService } from '@domain/services';

export class MovieService implements IMovieService {
  constructor(
    private movieRepository: IMovieRepository,
    private fileService: IFileService,
  ) {}

  async getById(id: string): Promise<Movie> {
    const movie = await this.movieRepository.getById(id);

    if (!movie) {
      throw new MovieNotFoundError();
    }

    return movie;
  }

  async createMovie(data: Movie, poster?: File): Promise<Movie> {
    if (poster) {
      const fileLink = await this.fileService.saveFile(poster);
      data.poster = fileLink;
    }
    // add check if genres exist

    return this.movieRepository.create(data);
  }

  async updateById(id: string, data: Movie, poster?: File): Promise<Movie> {
    const movie = await this.getById(id);

    if (movie.poster && !poster) {
      // delete poster;
    }

    if (poster) {
      const fileLink = await this.fileService.saveFile(poster);
      data.poster = fileLink;
    }

    const newMovie = { ...movie, ...data, updatedAt: new Date() };

    return this.movieRepository.updateById(id, newMovie);
  }

  async deleteById(id: string): Promise<Movie> {
    const movie = await this.getById(id);

    if (movie.poster) {
      // delete poster;
    }

    return this.movieRepository.deleteById(id);
  }

  async getAll(): Promise<Movie[]> {
    return this.movieRepository.getAll();
  }
}

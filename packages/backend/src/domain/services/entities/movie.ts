import type { File, Movie } from '@domain/models';

export interface IMovieService {
  getById(id: string): Promise<Movie>;

  createMovie(data: Movie, poster?: File): Promise<Movie>;

  getAll(): Promise<Movie[]>;

  updateById(id: string, data: Movie, poster?: File): Promise<Movie>;

  deleteById(id: string): Promise<Movie>;
}

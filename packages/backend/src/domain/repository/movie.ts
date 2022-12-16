import type { Movie } from '@domain/models';

export interface IMovieRepository {
  getAll(): Promise<Movie[]>;

  getById(id: string): Promise<Movie>;

  create(data: Movie): Promise<Movie>;

  updateById(id: string, data: Movie): Promise<Movie>;

  deleteById(id: string): Promise<Movie>;
}

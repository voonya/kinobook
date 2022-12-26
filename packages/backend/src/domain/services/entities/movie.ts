import type { File, Movie, Viewed, MovieWithRating } from '@domain/models';
import {
  CreateMovie,
  PaginatedEntity,
  IMovieFilters,
  IPagination,
} from '@domain/contracts';

export interface IMovieService {
  getById(id: string): Promise<MovieWithRating>;

  createMovie(data: CreateMovie, poster?: File): Promise<Movie>;

  getAll(): Promise<Movie[]>;

  updateById(id: string, data: CreateMovie, poster?: File): Promise<Movie>;

  deleteById(id: string): Promise<Movie>;

  getFiltered(filters: IMovieFilters): Promise<PaginatedEntity<Movie[]>>;

  getViews(
    movieId: string,
    pagination: IPagination,
  ): Promise<PaginatedEntity<Viewed[]>>;
}

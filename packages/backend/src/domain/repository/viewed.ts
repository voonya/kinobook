import { Viewed } from '@domain/models';
import { IPagination } from '@domain/contracts';
import { PaginatedEntity, IMovieFilters } from '@domain/contracts';

export interface IViewedRepository {
  create(viewed: Viewed): Promise<Viewed>;

  update(id: string, viewed: Viewed): Promise<Viewed>;

  getById(id: string, userId: string): Promise<Viewed>;

  getUserViewed(
    userId: string,
    pagination: IMovieFilters,
  ): Promise<PaginatedEntity<Viewed[]>>;

  deleteById(id: string): Promise<Viewed>;

  getMovieReview(
    movieId: string,
    pagination: IPagination,
  ): Promise<PaginatedEntity<Viewed[]>>;

  getByUserIdAndMovieId(userId: string, movieId: string): Promise<Viewed>;

  getMovieIdsInViewed(userId: string): Promise<string[]>;
}

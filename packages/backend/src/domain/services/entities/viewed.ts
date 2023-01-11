import { Viewed } from '@domain/models';
import {
  CreateViewed,
  PaginatedEntity,
  IMovieFilters,
} from '@domain/contracts';

export interface IViewedService {
  getById(id: string, userId: string): Promise<Viewed>;

  create(data: CreateViewed): Promise<Viewed>;

  updateById(id: string, data: CreateViewed): Promise<Viewed>;

  deleteByMovieId(movieId: string, userId: string): Promise<Viewed>;

  getUserViewed(
    userId: string,
    filters: IMovieFilters,
  ): Promise<PaginatedEntity<Viewed[]>>;

  getMovieIdsInViewed(userId: string): Promise<string[]>;
}

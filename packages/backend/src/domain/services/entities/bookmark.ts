import { Bookmark, Movie } from '@domain/models';
import { PaginatedEntity, IMovieFilters } from '@domain/contracts';

export interface IBookmarkService {
  create(userId: string, movieId: string): Promise<Bookmark>;

  deleteByUserIdAndMovieId(userId: string, movieId: string): Promise<Bookmark>;

  getMoviesIdInUserBookmarks(userId: string): Promise<string[]>;

  getMoviesInUserBookmarks(
    userId: string,
    filters: IMovieFilters,
  ): Promise<PaginatedEntity<Movie[]>>;
}

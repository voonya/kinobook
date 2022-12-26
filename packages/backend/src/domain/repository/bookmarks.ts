import { Bookmark } from '@domain/models';

export interface IBookmarkRepository {
  create(userId: string, movieId: string): Promise<Bookmark>;

  getByUserIdAndMovieId(userId: string, movieId: string): Promise<Bookmark>;

  deleteById(id: string): Promise<Bookmark>;

  getMoviesIdInUserBookmarks(userId: string): Promise<string[]>;
}

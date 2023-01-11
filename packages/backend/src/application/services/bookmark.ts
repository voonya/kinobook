import { Bookmark, Movie } from '@domain/models';
import { IBookmarkRepository, IMovieRepository } from '@domain/repository';
import { IBookmarkService } from '@domain/services';
import { PaginatedEntity, IMovieFilters } from '@domain/contracts';
import {
  EntityAlreadyExistError,
  EntityNotFoundError,
} from '@application/exeptions';

class BookmarkService implements IBookmarkService {
  constructor(
    private bookmarkRepository: IBookmarkRepository,
    private movieRepository: IMovieRepository,
  ) {}

  async create(userId: string, movieId: string): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.getByUserIdAndMovieId(
      userId,
      movieId,
    );

    if (bookmark) {
      throw new EntityAlreadyExistError('Bookmark');
    }

    const movie = await this.movieRepository.getById(movieId);

    if (!movie) {
      throw new EntityNotFoundError('Movie');
    }

    return this.bookmarkRepository.create(userId, movieId);
  }

  async deleteByUserIdAndMovieId(
    userId: string,
    movieId: string,
  ): Promise<Bookmark> {
    const bookmark = await this.bookmarkRepository.getByUserIdAndMovieId(
      userId,
      movieId,
    );

    if (!bookmark) {
      throw new EntityNotFoundError('Bookmark');
    }

    return this.bookmarkRepository.deleteById(bookmark.id);
  }

  getMoviesIdInUserBookmarks(userId: string): Promise<string[]> {
    return this.bookmarkRepository.getMoviesIdInUserBookmarks(userId);
  }

  getMoviesInUserBookmarks(
    userId: string,
    filters: IMovieFilters,
  ): Promise<PaginatedEntity<Movie[]>> {
    return this.movieRepository.getFilteredInBookmarks(filters, userId);
  }
}

export { BookmarkService };

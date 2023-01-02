import { Movie } from '@domain/models';
import { IMovieFilters, PaginatedEntity } from '@domain/contracts';

export interface IRecommendationService {
  getSimilarMovies(movieId: string, count: number): Promise<Movie[]>;

  getUserRecommendations(
    userId: string,
    filters?: IMovieFilters,
  ): Promise<PaginatedEntity<Movie[]>>;
}

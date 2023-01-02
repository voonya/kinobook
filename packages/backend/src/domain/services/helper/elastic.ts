import { Movie } from '@domain/models';
import {
  IMovieParamsWeights,
  IRecommendationFilters,
  PaginatedEntity,
} from '@domain/contracts';

export interface IElasticService {
  init(): Promise<void>;

  createMovie(movie: Movie): Promise<void>;

  deleteMovie(id: string): Promise<void>;

  updateMovie(id: string, movie: Movie): Promise<void>;

  getMoviesFunctionScore(
    weights: IMovieParamsWeights,
    viewedMovieIds: string[],
    filters?: IRecommendationFilters,
  ): Promise<PaginatedEntity<string[]>>;

  getMoviesColdstart(
    bookmarkIds: string[],
    viewedMovieIds: string[],
    filters?: IRecommendationFilters,
  ): Promise<PaginatedEntity<string[]>>;

  getSimilarMovie(movieId: string, count: number): Promise<string[]>;
}

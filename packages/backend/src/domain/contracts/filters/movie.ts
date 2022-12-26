import { IPagination } from './pagination';

export interface IMovieFilters extends IPagination {
  title?: string;
  genresId?: string[];
  writersId?: string[];
  actorsId?: string[];
  countriesId?: string[];
  releaseDate?: {
    from?: Date;
    to?: Date;
  };
  averageRate?: {
    from?: number;
    to?: number;
  };
}

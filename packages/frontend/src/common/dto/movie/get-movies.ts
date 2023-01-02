export interface IMovieFilterReleaseDate {
  from?: Date;
  to?: Date;
}

export interface IMovieFilterAverageRate {
  from?: number;
  to?: number;
}

export interface IMoviesFiltes {
  title?: string;
  genresId?: string[];
  directorsId?: string[];
  actorsId?: string[];
  countriesId?: string[];
  releaseDate?: IMovieFilterReleaseDate;
  averageRate?: IMovieFilterAverageRate;
  offset?: number;
  limit?: number;
}

export interface IPaginationFilter {
  offset?: number;
  limit?: number;
}

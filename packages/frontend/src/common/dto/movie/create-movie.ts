export interface ICreateMovieDto {
  title: string;
  description: string;
  tagline?: string;
  releaseDate?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  averageRate?: number;
  countVotes?: number;
  poster?: string;
  genresId: string[];
  countriesId?: string[];
  writersId?: string[];
  actorsId?: string[];
}

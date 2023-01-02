import type { BaseModel } from './base';

export interface IGenre extends BaseModel {
  name: string;
}

export interface ICountry extends BaseModel {
  name: string;
}

export interface IActor extends BaseModel {
  name: string;
  surname: string;
}

export interface IDirector extends BaseModel {
  name: string;
  surname: string;
}

export interface IMovieDense extends BaseModel {
  title: string;
  description: string;
  tagline?: string | null;
  releaseDate?: string | null;
  runtime?: number | null;
  budget?: number | null;
  revenue?: number | null;
  averageRate?: number | null;
  countVotes?: number | null;
  poster?: string | null;
  trailer?: string | null;
}

export interface IMovie extends IMovieDense {
  genres: IGenre[];
  countries: ICountry[];
  directors: IDirector[];
  actors: IActor[];
}

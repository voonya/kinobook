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

export interface IWriter extends BaseModel {
  name: string;
  surname: string;
}

export interface IMovie extends BaseModel {
  title: string;
  description: string;
  tagline?: string;
  releaseDate?: string;
  runtime?: number;
  budget?: number;
  revenue?: number;
  averageRate: number;
  countVotes: number;
  poster?: string;
  trailer?: string;
  genres: IGenre[];
  countries: ICountry[];
  writers: IWriter[];
  actors: IActor[];
}

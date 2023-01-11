import { BaseModel } from '../base';
import { Genre } from '../genre';
import { Country } from '../country';
import { Director } from '../director';
import { Actor } from '../actor';

export class Movie extends BaseModel {
  title: string;

  description: string;

  tagline?: string;

  releaseDate?: Date;

  runtime?: number;

  budget?: number;

  revenue?: number;

  poster?: string;

  trailer?: string;

  averageRate?: number;

  countVotes?: number;

  megogoLink?: string;

  genres: Genre[];

  countries?: Country[];

  directors?: Director[];

  actors?: Actor[];
}

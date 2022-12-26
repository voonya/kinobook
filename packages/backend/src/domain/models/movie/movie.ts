import { BaseModel } from '../base';
import { Genre } from '../genre';
import { Country } from '../country';
import { Writer } from '../writer';
import { Actor } from '../actor';

export class MovieDense extends BaseModel {
  title: string;

  description: string;

  tagline?: string;

  releaseDate?: Date;

  runtime?: number;

  budget?: number;

  revenue?: number;

  poster?: string;

  trailer?: string;
}

export class Movie extends MovieDense {
  genres: Genre[];

  countries?: Country[];

  writers?: Writer[];

  actors?: Actor[];
}

export class MovieWithRating extends Movie {
  averageRate: number;

  countVotes: number;
}

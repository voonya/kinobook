import { BaseModel } from '../base';
import { Genre } from '../genre';
import { Country } from '../country';
import { Director } from '../director';
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

  averageRate?: number;

  countVotes?: number;
}

export class Movie extends MovieDense {
  genres: Genre[];

  countries?: Country[];

  directors?: Director[];

  actors?: Actor[];
}

// export class MovieWithRating extends Movie {
//   averageRate: number;

//   countVotes: number;
// }

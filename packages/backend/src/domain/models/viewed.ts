import { BaseModel } from './base';
import { Movie } from './movie';
import { BaseUser } from './user';

export class Viewed extends BaseModel {
  movie: Movie;

  user: BaseUser;

  private: boolean;

  rate: number;

  description?: string;
}

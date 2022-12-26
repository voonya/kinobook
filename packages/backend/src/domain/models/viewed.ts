import { BaseModel } from './base';
import { MovieDense } from './movie';
import { BaseUser } from './user';

export class Viewed extends BaseModel {
  movie: MovieDense;

  user: BaseUser;

  private: boolean;

  rate?: number;

  description?: string;
}

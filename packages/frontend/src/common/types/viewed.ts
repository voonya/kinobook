import type { BaseModel } from './base';
import type { IMovie } from './movie';
import type { IUser } from './user';

export interface IViewed extends BaseModel {
  movie: IMovie;
  user: IUser;
  private: boolean;
  rate: number;
  description?: string;
}

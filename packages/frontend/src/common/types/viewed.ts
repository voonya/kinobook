import type { BaseModel } from './base';
import type { IMovieDense } from './movie';
import type { IUser } from './user';

export interface IViewed extends BaseModel {
  movie: IMovieDense;
  user: IUser;
  private: boolean;
  rate: number;
  description?: string;
}

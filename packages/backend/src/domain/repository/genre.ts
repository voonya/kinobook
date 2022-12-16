import { Genre } from '@domain/models';
import { IBaseRepository } from './base';

export interface IGenreRepository extends IBaseRepository<Genre> {
  getByName(name: string): Promise<Genre>;
}

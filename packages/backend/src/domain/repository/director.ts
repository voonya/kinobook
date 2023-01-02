import { Director } from '@domain/models';
import { IBaseRepository } from './base';

export interface IDirectorRepository extends IBaseRepository<Director> {
  getByNameAndSurname(name: string, surname: string): Promise<Director>;
}

import { Country } from '@domain/models';
import { IBaseRepository } from './base';

export interface ICountryRepository extends IBaseRepository<Country> {
  getByName(name: string): Promise<Country>;
}

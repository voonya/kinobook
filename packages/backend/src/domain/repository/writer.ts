import { Writer } from '@domain/models';
import { IBaseRepository } from './base';

export interface IWriterRepository extends IBaseRepository<Writer> {
  getByNameAndSurname(name: string, surname: string): Promise<Writer>;
}

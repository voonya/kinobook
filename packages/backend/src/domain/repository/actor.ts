import { Actor } from '@domain/models';
import { IBaseRepository } from './base';

interface IActorRepository extends IBaseRepository<Actor> {
  getByNameAndSurname(name: string, surname: string): Promise<Actor>;
}

export { IActorRepository };

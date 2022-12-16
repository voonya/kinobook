import { Actor } from '@domain/models';
import { IActorRepository } from '@domain/repository';
import type { IActorService } from '@domain/services';
import {
  EntityNotFoundError,
  EntityAlreadyExistError,
} from '@application/exeptions';

export class ActorService implements IActorService {
  constructor(private actorRepository: IActorRepository) {}

  async getById(id: string): Promise<Actor> {
    const actor = await this.actorRepository.getById(id);

    if (!actor) {
      throw new EntityNotFoundError('Actor');
    }

    return actor;
  }

  async create(data: Actor): Promise<Actor> {
    const actor = await this.getByNameAndSurname(data.name, data.surname);

    if (actor) {
      throw new EntityAlreadyExistError('Actor');
    }
    const created = await this.actorRepository.create(data);

    return created;
  }

  async deleteById(id: string): Promise<Actor> {
    const actor = await this.getById(id);

    await this.actorRepository.deleteById(id);

    return actor;
  }

  async updateById(id: string, data: Actor): Promise<Actor> {
    await this.getById(id);

    const actor = await this.getByNameAndSurname(data.name, data.surname);

    if (actor) {
      throw new EntityAlreadyExistError('Actor');
    }

    const updated = await this.actorRepository.updateById(id, data);

    return updated;
  }

  async getAll(): Promise<Actor[]> {
    return this.actorRepository.getAll();
  }

  private async getByNameAndSurname(name: string, surname: string) {
    return this.actorRepository.getByNameAndSurname(name, surname);
  }
}

import { Director } from '@domain/models';
import { IDirectorRepository } from '@domain/repository';
import type { IDirectorService } from '@domain/services';
import {
  EntityNotFoundError,
  EntityAlreadyExistError,
} from '@application/exeptions';

export class DirectorService implements IDirectorService {
  constructor(private directorRepository: IDirectorRepository) {}

  async getById(id: string): Promise<Director> {
    const director = await this.directorRepository.getById(id);

    if (!director) {
      throw new EntityNotFoundError('Director');
    }

    return director;
  }

  async create(data: Director): Promise<Director> {
    const director = await this.getByNameAndSurname(data.name, data.surname);

    if (director) {
      throw new EntityAlreadyExistError('Director');
    }

    const created = await this.directorRepository.create(data);

    return created;
  }

  async deleteById(id: string): Promise<Director> {
    const director = await this.getById(id);

    await this.directorRepository.deleteById(id);

    return director;
  }

  async updateById(id: string, data: Director): Promise<Director> {
    await this.getById(id);

    const director = await this.getByNameAndSurname(data.name, data.surname);

    if (director) {
      throw new EntityAlreadyExistError('Director');
    }

    const updated = await this.directorRepository.updateById(id, data);

    return updated;
  }

  async getAll(): Promise<Director[]> {
    return this.directorRepository.getAll();
  }

  private async getByNameAndSurname(name: string, surname: string) {
    return this.directorRepository.getByNameAndSurname(name, surname);
  }
}

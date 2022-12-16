import { Genre } from '@domain/models';
import { IGenreRepository } from '@domain/repository';
import type { IGenreService } from '@domain/services';
import {
  EntityNotFoundError,
  EntityAlreadyExistError,
} from '@application/exeptions';

export class GenreService implements IGenreService {
  constructor(private genreRepository: IGenreRepository) {}

  async getById(id: string): Promise<Genre> {
    const genre = await this.genreRepository.getById(id);

    if (!genre) {
      throw new EntityNotFoundError('Genre');
    }

    return genre;
  }

  async create(data: Genre): Promise<Genre> {
    const genre = await this.getByName(data.name);
    if (genre) {
      throw new EntityAlreadyExistError('Genre');
    }

    const created = await this.genreRepository.create(data);

    return created;
  }

  async deleteById(id: string): Promise<Genre> {
    const genre = await this.getById(id);

    await this.genreRepository.deleteById(id);

    return genre;
  }

  async updateById(id: string, data: Genre): Promise<Genre> {
    await this.getById(id);

    const genre = await this.getByName(data.name);
    if (genre) {
      throw new EntityAlreadyExistError('Genre');
    }

    const updated = await this.genreRepository.updateById(id, data);

    return updated;
  }

  async getAll(): Promise<Genre[]> {
    return this.genreRepository.getAll();
  }

  private async getByName(name: string) {
    return this.genreRepository.getByName(name);
  }
}

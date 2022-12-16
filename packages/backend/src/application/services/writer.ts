import { Writer } from '@domain/models';
import { IWriterRepository } from '@domain/repository';
import type { IWriterService } from '@domain/services';
import {
  EntityNotFoundError,
  EntityAlreadyExistError,
} from '@application/exeptions';

export class WriterService implements IWriterService {
  constructor(private writerRepository: IWriterRepository) {}

  async getById(id: string): Promise<Writer> {
    const writer = await this.writerRepository.getById(id);

    if (!writer) {
      throw new EntityNotFoundError('Writer');
    }

    return writer;
  }

  async create(data: Writer): Promise<Writer> {
    const writer = await this.getByNameAndSurname(data.name, data.surname);

    if (writer) {
      throw new EntityAlreadyExistError('Writer');
    }

    const created = await this.writerRepository.create(data);

    return created;
  }

  async deleteById(id: string): Promise<Writer> {
    const writer = await this.getById(id);

    await this.writerRepository.deleteById(id);

    return writer;
  }

  async updateById(id: string, data: Writer): Promise<Writer> {
    await this.getById(id);

    const writer = await this.getByNameAndSurname(data.name, data.surname);

    if (writer) {
      throw new EntityAlreadyExistError('Writer');
    }

    const updated = await this.writerRepository.updateById(id, data);

    return updated;
  }

  async getAll(): Promise<Writer[]> {
    return this.writerRepository.getAll();
  }

  private async getByNameAndSurname(name: string, surname: string) {
    return this.writerRepository.getByNameAndSurname(name, surname);
  }
}

import { Country } from '@domain/models';
import { ICountryRepository } from '@domain/repository';
import type { ICountryService } from '@domain/services';
import {
  EntityNotFoundError,
  EntityAlreadyExistError,
} from '@application/exeptions';

export class CountryService implements ICountryService {
  constructor(private countryRepository: ICountryRepository) {}

  async getById(id: string): Promise<Country> {
    const country = await this.countryRepository.getById(id);

    if (!country) {
      throw new EntityNotFoundError('Country');
    }

    return country;
  }

  async create(data: Country): Promise<Country> {
    const country = await this.getByName(data.name);
    if (country) {
      throw new EntityAlreadyExistError('Country');
    }
    const created = await this.countryRepository.create(data);

    return created;
  }

  async deleteById(id: string): Promise<Country> {
    const country = await this.getById(id);

    await this.countryRepository.deleteById(id);

    return country;
  }

  async updateById(id: string, data: Country): Promise<Country> {
    await this.getById(id);

    const country = await this.getByName(data.name);
    if (country) {
      throw new EntityAlreadyExistError('Country');
    }

    const updated = await this.countryRepository.updateById(id, data);

    return updated;
  }

  async getAll(): Promise<Country[]> {
    return this.countryRepository.getAll();
  }

  private async getByName(name: string) {
    return this.countryRepository.getByName(name);
  }
}

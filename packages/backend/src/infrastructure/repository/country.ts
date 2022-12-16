import { Country } from '@domain/models';
import { ICountryRepository } from '@domain/repository';
import { Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma/prisma';

class CountryRepository implements ICountryRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  getById(id: string): Promise<Country> {
    return this.prisma.country.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getAll(): Promise<Country[]> {
    return this.prisma.country.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateById(id: string, data: Country): Promise<Country> {
    return this.prisma.country.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  deleteById(id: string): Promise<Country> {
    return this.prisma.country.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  create(data: Country): Promise<Country> {
    return this.prisma.country.create({
      data,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getByName(name: string): Promise<Country> {
    return this.prisma.country.findFirst({
      where: { name },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export { CountryRepository };

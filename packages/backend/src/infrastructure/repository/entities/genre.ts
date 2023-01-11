import { Genre } from '@domain/models';
import { IGenreRepository } from '@domain/repository';
import { Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma';

class GenreRepository implements IGenreRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  getById(id: string): Promise<Genre> {
    return this.prisma.genre.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateById(id: string, data: Genre): Promise<Genre> {
    return this.prisma.genre.update({
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

  deleteById(id: string): Promise<Genre> {
    return this.prisma.genre.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  create(data: Genre): Promise<Genre> {
    return this.prisma.genre.create({
      data,
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getByName(name: string): Promise<Genre> {
    return this.prisma.genre.findFirst({
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

export { GenreRepository };

import { Director } from '@domain/models';
import { IDirectorRepository } from '@domain/repository';
import { Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma';

class DirectorRepository implements IDirectorRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  getById(id: string): Promise<Director> {
    return this.prisma.director.findFirst({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getAll(): Promise<Director[]> {
    return this.prisma.director.findMany({
      orderBy: [
        {
          name: 'asc',
        },
      ],
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateById(id: string, data: Director): Promise<Director> {
    return this.prisma.director.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  deleteById(id: string): Promise<Director> {
    return this.prisma.director.delete({
      where: { id },
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  create(data: Director): Promise<Director> {
    return this.prisma.director.create({
      data,
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  getByNameAndSurname(name: string, surname: string): Promise<Director> {
    return this.prisma.director.findFirst({
      where: { name, surname },
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}

export { DirectorRepository };

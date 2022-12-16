import { Writer } from '@domain/models';
import { IWriterRepository } from '@domain/repository';
import { Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma/prisma';

class WriterRepository implements IWriterRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  getById(id: string): Promise<Writer> {
    return this.prisma.writer.findFirst({
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

  getAll(): Promise<Writer[]> {
    return this.prisma.writer.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  updateById(id: string, data: Writer): Promise<Writer> {
    return this.prisma.writer.update({
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

  deleteById(id: string): Promise<Writer> {
    return this.prisma.writer.delete({
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

  create(data: Writer): Promise<Writer> {
    return this.prisma.writer.create({
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

  getByNameAndSurname(name: string, surname: string): Promise<Writer> {
    return this.prisma.writer.findFirst({
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

export { WriterRepository };

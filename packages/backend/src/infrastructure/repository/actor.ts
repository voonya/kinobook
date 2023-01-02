import { IActorRepository } from '@domain/repository';
import { Actor } from '@domain/models';
import { Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma/prisma';

class ActorRepository implements IActorRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  getById(id: string): Promise<Actor> {
    return this.prisma.actor.findFirst({
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

  getAll(): Promise<Actor[]> {
    return this.prisma.actor.findMany({
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

  updateById(id: string, data: Actor): Promise<Actor> {
    return this.prisma.actor.update({
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

  deleteById(id: string): Promise<Actor> {
    return this.prisma.actor.delete({
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

  create(data: Actor): Promise<Actor> {
    return this.prisma.actor.create({
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

  getByNameAndSurname(name: string, surname: string): Promise<Actor> {
    return this.prisma.actor.findFirst({
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

export { ActorRepository };

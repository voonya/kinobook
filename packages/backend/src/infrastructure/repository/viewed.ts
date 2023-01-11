import { Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from './prisma/prisma';
import { IViewedRepository } from '@domain/repository';
import { MOVIE_OFFSET, MOVIE_LIMIT } from '@domain/constants';
import { getMovieFilters } from './mappers';
import { IPagination, PaginatedEntity, IMovieFilters } from '@domain/contracts';
import { Viewed } from '@domain/models';
import { mapViewed } from './mappers';
import { defaultIncludingMovie } from './mappers';

export class ViewedRepository implements IViewedRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  async create(viewed: Viewed): Promise<Viewed> {
    const created = await this.prisma.viewed.create({
      data: {
        ...viewed,
        user: { connect: { id: viewed.user.id } },
        movie: {
          connect: { id: viewed.movie.id },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        movie: true,
      },
    });

    if (!created) return null;

    return mapViewed(created);
  }

  async update(id: string, viewed: Viewed): Promise<Viewed> {
    const updated = await this.prisma.viewed.update({
      where: { id },
      data: {
        ...viewed,
        user: { connect: { id: viewed.user.id } },
        movie: {
          connect: { id: viewed.movie.id },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        movie: true,
      },
    });

    if (!updated) return null;

    return mapViewed(updated);
  }

  async getById(id: string, userId: string): Promise<Viewed> {
    const viewed = await this.prisma.viewed.findFirst({
      where: { id, userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        movie: true,
      },
    });

    if (!viewed) return null;

    return mapViewed(viewed);
  }

  async getUserViewed(
    userId: string,
    filters: IMovieFilters,
  ): Promise<PaginatedEntity<Viewed[]>> {
    const [views, count] = await this.prisma.$transaction([
      this.prisma.viewed.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        skip: filters.offset || MOVIE_OFFSET,
        take: filters.limit || MOVIE_LIMIT,
        where: {
          userId,
          movie: {
            ...getMovieFilters(filters),
          },
        },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          movie: {
            include: {
              ...defaultIncludingMovie,
            },
          },
        },
      }),
      this.prisma.viewed.count({
        where: {
          userId,
          movie: {
            ...getMovieFilters(filters),
          },
        },
      }),
    ]);

    return { data: views.map(mapViewed), count };
  }

  async getAllUserViewed(userId: string): Promise<Viewed[]> {
    const views = await this.prisma.viewed.findMany({
      orderBy: [
        {
          updatedAt: 'desc',
        },
      ],
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        movie: true,
      },
    });

    return views.map(mapViewed);
  }

  async deleteById(id: string): Promise<Viewed> {
    const deleted = await this.prisma.viewed.delete({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        movie: true,
      },
    });

    if (!deleted) return null;

    return mapViewed(deleted);
  }

  async getMovieReview(
    movieId: string,
    pagination: IPagination,
  ): Promise<PaginatedEntity<Viewed[]>> {
    const [views, count] = await this.prisma.$transaction([
      this.prisma.viewed.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        where: { movieId, private: false },
        include: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
          movie: true,
        },
      }),
      this.prisma.viewed.count({
        where: { movieId, private: false },
      }),
    ]);

    return { data: views.map(mapViewed), count };
  }

  async getByUserIdAndMovieId(
    userId: string,
    movieId: string,
  ): Promise<Viewed> {
    const viewed = await this.prisma.viewed.findFirst({
      where: { userId, movieId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
          },
        },
        movie: true,
      },
    });

    if (!viewed) return null;

    return mapViewed(viewed);
  }

  async getMovieIdsInViewed(userId: string): Promise<string[]> {
    const views = await this.prisma.viewed.findMany({
      where: { userId },
    });

    return views.map((el) => el.movieId);
  }
}

import type { Movie } from '@domain/models';
import type { IMovieRepository } from '@domain/repository';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  async getAll(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({
      include: {
        genres: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        writers: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        countries: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        actors: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    return movies.map((movie) => ({
      ...movie,
      budget: movie.budget && Number(movie.budget),
      revenue: movie.revenue && Number(movie.revenue),
      averageRate: movie.averageRate && Number(movie.averageRate),
      countVotes: movie.countVotes && Number(movie.countVotes),
    }));
  }

  async getById(id: string): Promise<Movie | null> {
    const movie = await this.prisma.movie.findFirst({
      where: { id },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        writers: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        countries: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        actors: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!movie) return null;

    return {
      ...movie,
      budget: movie.budget && Number(movie.budget),
      revenue: movie.revenue && Number(movie.revenue),
      averageRate: movie.averageRate && Number(movie.averageRate),
      countVotes: movie.countVotes && Number(movie.countVotes),
    };
  }

  async create(data: Movie): Promise<Movie> {
    const { genres, countries, writers, actors, ...dataWithoutIds } = data;
    const movie = await this.prisma.movie.create({
      data: {
        ...dataWithoutIds,
        genres: {
          connect: genres.map((genre) => ({ id: genre.id })),
        },
        countries: {
          connect: countries?.map((country) => ({ id: country.id })) ?? [],
        },
        writers: {
          connect: writers?.map((writer) => ({ id: writer.id })) ?? [],
        },
        actors: {
          connect: actors?.map((actor) => ({ id: actor.id })) ?? [],
        },
      },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        writers: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        countries: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        actors: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!movie) return null;

    return {
      ...movie,
      budget: movie.budget && Number(movie.budget),
      revenue: movie.revenue && Number(movie.revenue),
      averageRate: movie.averageRate && Number(movie.averageRate),
      countVotes: movie.countVotes && Number(movie.countVotes),
    };
  }

  async updateById(id: string, data: Movie): Promise<Movie> {
    const { genres, countries, writers, actors, ...dataWithoutIds } = data;
    const movie = await this.prisma.movie.update({
      where: { id },
      data: {
        ...dataWithoutIds,
        genres: {
          connect: genres.map((genre) => ({ id: genre.id })),
        },
        countries: {
          connect: countries?.map((country) => ({ id: country.id })) ?? [],
        },
        writers: {
          connect: writers?.map((writer) => ({ id: writer.id })) ?? [],
        },
        actors: {
          connect: actors?.map((actor) => ({ id: actor.id })) ?? [],
        },
      },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        writers: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        countries: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        actors: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!movie) return null;

    return {
      ...movie,
      budget: movie.budget && Number(movie.budget),
      revenue: movie.revenue && Number(movie.revenue),
      averageRate: movie.averageRate && Number(movie.averageRate),
      countVotes: movie.countVotes && Number(movie.countVotes),
    };
  }

  async deleteById(id: string): Promise<Movie> {
    const movie = await this.prisma.movie.delete({
      where: { id },
      include: {
        genres: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        writers: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        countries: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        actors: {
          select: {
            id: true,
            name: true,
            surname: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!movie) return null;

    return {
      ...movie,
      budget: movie.budget && Number(movie.budget),
      revenue: movie.revenue && Number(movie.revenue),
      averageRate: movie.averageRate && Number(movie.averageRate),
      countVotes: movie.countVotes && Number(movie.countVotes),
    };
  }
}

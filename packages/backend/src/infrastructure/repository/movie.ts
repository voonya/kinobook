import type { Movie, MovieWithRating } from '@domain/models';
import type { IMovieRepository } from '@domain/repository';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma';
import { mapMovie, getMovieFilters } from './mappers';
import { MOVIE_LIMIT, MOVIE_OFFSET } from '@domain/constants';
import { PaginatedEntity, IMovieFilters } from '@domain/contracts';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  async getAll(): Promise<Movie[]> {
    const movies = await this.prisma.movie.findMany({
      include: defaultIncluding,
    });

    return movies.map(mapMovie);
  }

  async getById(id: string): Promise<MovieWithRating> {
    const [movie, aggr] = await this.prisma.$transaction([
      this.prisma.movie.findFirst({
        where: { id },
        include: defaultIncluding,
      }),
      this.prisma.viewed.aggregate({
        _avg: {
          rate: true,
        },
        _count: {
          rate: true,
        },
        where: {
          movieId: id,
          private: false,
        },
      }),
    ]);

    if (!movie) return null;

    return mapMovie({
      ...movie,
      averageRate: aggr._avg.rate,
      countVotes: aggr._count.rate,
    });
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
      include: defaultIncluding,
    });

    if (!movie) return null;

    return mapMovie(movie);
  }

  async updateById(id: string, data: Movie): Promise<Movie> {
    const { genres, countries, writers, actors, ...dataWithoutIds } = data;
    const movie = await this.prisma.movie.update({
      where: { id },
      data: {
        ...dataWithoutIds,
        genres: {
          set: [],
          connect: genres.map((genre) => ({ id: genre.id })),
        },
        countries: {
          set: countries ? undefined : [],
          connect: countries?.map((country) => ({ id: country.id })),
        },
        writers: {
          set: writers ? undefined : [],
          connect: writers?.map((writer) => ({ id: writer.id })),
        },
        actors: {
          set: actors ? undefined : [],
          connect: actors?.map((actor) => ({ id: actor.id })),
        },
      },
      include: defaultIncluding,
    });

    if (!movie) return null;

    return mapMovie(movie);
  }

  async deleteById(id: string): Promise<Movie> {
    const movie = await this.prisma.movie.delete({
      where: { id },
      include: defaultIncluding,
    });

    if (!movie) return null;

    return mapMovie(movie);
  }

  async getFiltered(filters: IMovieFilters): Promise<PaginatedEntity<Movie[]>> {
    const [movies, count] = await this.prisma.$transaction([
      this.prisma.movie.findMany({
        orderBy: [
          {
            createdAt: 'desc',
          },
        ],
        skip: filters.offset || MOVIE_OFFSET,
        take: filters.limit || MOVIE_LIMIT,
        where: getMovieFilters(filters),
        include: defaultIncluding,
      }),
      this.prisma.movie.count({ where: getMovieFilters(filters) }),
    ]);

    return { data: movies.map(mapMovie), count };
  }

  async getFilteredInBookmarks(
    filters: IMovieFilters,
    userId: string,
  ): Promise<PaginatedEntity<Movie[]>> {
    const [movies, count] = await this.prisma.$transaction([
      this.prisma.bookmarks.findMany({
        skip: filters.offset || MOVIE_OFFSET,
        take: filters.limit || MOVIE_LIMIT,
        where: {
          userId,
          movie: {
            ...getMovieFilters(filters),
          },
        },
        include: {
          movie: {
            select: {
              id: true,
              title: true,
              releaseDate: true,
              poster: true,
              genres: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.prisma.bookmarks.count({
        where: {
          userId,
        },
      }),
    ]);

    return { data: movies.map((el) => mapMovie(el.movie)), count };
  }
}

const defaultIncluding = {
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
};

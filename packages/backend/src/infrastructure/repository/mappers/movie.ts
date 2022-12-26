import { IMovieFilters } from '@domain/contracts';
import {
  Movie as PrismaMovie,
  Genre as PrismaGenre,
  Writer as PrismaWriter,
  Country as PrismaCountry,
  Actor as PrismaActor,
} from '@prisma/client';

export type PrismaMovieIncluded = PrismaMovie & {
  genres?: Omit<PrismaGenre, 'movieId'>[];
  actors?: Omit<PrismaActor, 'movieId'>[];
  writers?: Omit<PrismaWriter, 'movieId'>[];
  countries?: Omit<PrismaCountry, 'movieId'>[];
};

export const mapMovie = (movie: any) => ({
  ...movie,
  budget: movie.budget && Number(movie.budget),
  revenue: movie.revenue && Number(movie.revenue),
});

export const getMovieFilters = (filters: IMovieFilters) => ({
  title: {
    contains: filters.title,
    mode: 'insensitive' as any,
  },
  genres: filters.genresId && {
    some: {
      id: {
        in: filters.genresId,
      },
    },
  },
  actors: filters.actorsId && {
    some: {
      id: {
        in: filters.actorsId,
      },
    },
  },
  writers: filters.writersId && {
    some: {
      id: {
        in: filters.writersId,
      },
    },
  },
  countries: filters.countriesId && {
    some: {
      id: {
        in: filters.countriesId,
      },
    },
  },
  releaseDate: filters.releaseDate && {
    gte: filters.releaseDate?.from,
    lte: filters.releaseDate?.to,
  },
  averageRate: filters.averageRate && {
    gte: filters.averageRate?.from,
    lte: filters.averageRate?.to,
  },
});

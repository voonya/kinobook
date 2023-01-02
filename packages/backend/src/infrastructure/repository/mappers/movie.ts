import { IMovieFilters } from '@domain/contracts';
import {
  Movie as PrismaMovie,
  Genre as PrismaGenre,
  Director as PrismaDirector,
  Country as PrismaCountry,
  Actor as PrismaActor,
} from '@prisma/client';

export type PrismaMovieIncluded = PrismaMovie & {
  genres?: Omit<PrismaGenre, 'movieId'>[];
  actors?: Omit<PrismaActor, 'movieId'>[];
  directors?: Omit<PrismaDirector, 'movieId'>[];
  countries?: Omit<PrismaCountry, 'movieId'>[];
};

export const mapMovie = (movie: any) => {
  if (!movie) return null;

  return {
    ...movie,
    budget: movie.budget >= 0 && Number(movie.budget),
    revenue: movie.revenue >= 0 && Number(movie.revenue),
    averageRate: movie.averageRate >= 0 && Number(movie.averageRate),
    countVotes: movie.countVotes >= 0 && Number(movie.countVotes),
  };
};

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
  directors: filters.directorsId && {
    some: {
      id: {
        in: filters.directorsId,
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

export const defaultIncludingMovie = {
  genres: {
    select: {
      id: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  },
  directors: {
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

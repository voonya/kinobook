import { movieMapping } from '../../../../src/infrastructure/services/elastic/mappings';
import { Client } from '@elastic/elasticsearch';
import { PrismaClient } from '@prisma/client';
import { Movie } from '@domain/models';
import {
  mapMovie,
  defaultIncludingMovie,
} from '../../../../src/infrastructure/repository/mappers';

const client = new Client({ node: 'http://localhost:9200' });

export async function seedElasticMovies(prisma: PrismaClient) {
  await checkIfExistIndex();

  const movies = (
    await prisma.movie.findMany({ include: defaultIncludingMovie })
  ).map(mapMovie);

  for (const movie of movies) {
    createMovie(movie);
  }
}

export async function deleteElasticMovies() {
  return client.deleteByQuery({
    index: 'movies',
    body: {
      query: {
        match_all: {},
      },
    },
  });
}

async function createMovie(movie: Movie) {
  const genres = movie.genres.map((el) => el.name);
  const countries = movie.countries.map((el) => el.name);
  const directors = movie.directors.map((el) => `${el.name} ${el.surname}`);
  const actors = movie.actors.map((el) => `${el.name} ${el.surname}`);

  await client
    .index({
      index: 'movies',
      id: movie.id,
      document: {
        ...movie,
        genres,
        countries,
        directors,
        actors,
      },
    })
    .then(console.log);
}

async function checkIfExistIndex() {
  return client.indices
    .exists({
      index: 'movies',
    })
    .then((res) => {
      if (!res) {
        return createMovieIndex();
      }
    });
}

async function createMovieIndex() {
  return client.indices
    .create({
      index: 'movies',
      body: {
        settings: {
          index: {
            number_of_replicas: 0, // for local development
          },
        },
      },
    })
    .then(() => putMapping());
}

async function putMapping() {
  return client.indices.putMapping({
    index: 'movies',
    ...movieMapping,
  });
}

import movies from './data.json';
import { PrismaClient } from '@prisma/client';

interface MovieJson {
  title: string;

  description: string;

  tagline: string;

  releaseDate: string;

  runtime: number;

  budget: number;

  revenue: number;

  poster: string;

  genres: string[];

  countries: string[];

  directors: string[];

  actors: string[];
}

export async function seedMovies(prisma: PrismaClient) {
  for (const mockMovie of <MovieJson[]>movies) {
    const genres = await processGenres(mockMovie.genres, prisma);

    const actors = await processActors(mockMovie.actors, prisma);

    const directors = await processDirectors(mockMovie.directors, prisma);

    const countries = await processCountries(mockMovie.countries, prisma);

    delete mockMovie.genres;
    delete mockMovie.countries;
    delete mockMovie.directors;
    delete mockMovie.actors;

    mockMovie.releaseDate = new Date(mockMovie.releaseDate).toISOString();

    mockMovie.poster = 'foreign:tmdb:' + mockMovie.poster;

    await prisma.movie.create({
      data: {
        ...mockMovie,
        genres: {
          connect: genres.map((genre) => ({ id: genre })),
        },
        countries: {
          connect: countries?.map((country) => ({ id: country })),
        },
        directors: {
          connect: directors.map((director) => ({ id: director })),
        },
        actors: {
          connect: actors.map((actor) => ({ id: actor })),
        },
      },
    });
  }
}

async function processGenres(genres: string[], prisma: PrismaClient) {
  const genresId: string[] = [];

  for (const genre of genres) {
    const genreDb = await prisma.genre.findFirst({ where: { name: genre } });
    let genreId;
    if (!genreDb) {
      const createdGenre = await prisma.genre.create({ data: { name: genre } });
      genreId = createdGenre.id;
    } else {
      genreId = genreDb.id;
    }

    genresId.push(genreId);
  }

  return genresId;
}

async function processCountries(countries: string[], prisma: PrismaClient) {
  const countriesId: string[] = [];

  for (const country of countries) {
    const countryDb = await prisma.country.findFirst({
      where: { name: country },
    });
    let countryId;
    if (!countryDb) {
      const createdCountry = await prisma.country.create({
        data: { name: country },
      });
      countryId = createdCountry.id;
    } else {
      countryId = countryDb.id;
    }

    countriesId.push(countryId);
  }

  return countriesId;
}

async function processDirectors(directors: string[], prisma: PrismaClient) {
  const directorsId: string[] = [];

  for (const director of directors) {
    const [name, ...surname] = director.split(' ');
    const directorDb = await prisma.director.findFirst({
      where: { name, surname: surname.join(' ') },
    });
    let directorId;

    if (!directorDb) {
      const createdDirector = await prisma.director.create({
        data: { name, surname: surname.join(' ') },
      });
      directorId = createdDirector.id;
    } else {
      directorId = directorDb.id;
    }

    directorsId.push(directorId);
  }

  return directorsId;
}

async function processActors(actors: string[], prisma: PrismaClient) {
  const actorsId: string[] = [];

  for (const actor of actors) {
    const [name, ...surname] = actor.split(' ');
    const actorDb = await prisma.actor.findFirst({
      where: { name, surname: surname.join(' ') },
    });
    let actorId;

    if (!actorDb) {
      const createdActor = await prisma.actor.create({
        data: { name, surname: surname.join(' ') },
      });
      actorId = createdActor.id;
    } else {
      actorId = actorDb.id;
    }

    actorsId.push(actorId);
  }

  return actorsId;
}

import {
  seedGenres,
  seedCountries,
  seedActors,
  seedDirectors,
  seedUsers,
  seedMovies,
  seedElasticMovies,
} from './create';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();

const main = async () => {
  await seedGenres(prismaClient);
  await seedCountries(prismaClient);
  await seedActors(prismaClient);
  await seedDirectors(prismaClient);
  await seedUsers(prismaClient);
  await seedMovies(prismaClient);
  await seedElasticMovies(prismaClient);
};

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });

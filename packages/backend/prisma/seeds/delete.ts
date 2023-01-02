import { PrismaClient } from '@prisma/client';
import { deleteElasticMovies } from './create';

const prismaClient = new PrismaClient();

const main = async () => {
  await prismaClient.genre.deleteMany();
  await prismaClient.country.deleteMany();
  await prismaClient.actor.deleteMany();
  await prismaClient.director.deleteMany();
  await prismaClient.user.deleteMany();
  await prismaClient.movie.deleteMany();
  await deleteElasticMovies();
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

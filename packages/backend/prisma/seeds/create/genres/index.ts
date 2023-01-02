import { mockGenres } from './data';
import { PrismaClient } from '@prisma/client';

export async function seedGenres(prisma: PrismaClient) {
  const genres = await prisma.genre.findMany();

  if (genres.length === mockGenres.length) return;

  await prisma.genre.createMany({ data: mockGenres });
}

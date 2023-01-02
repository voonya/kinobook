import { mockDirectors } from './data';
import { PrismaClient } from '@prisma/client';

export async function seedDirectors(prisma: PrismaClient) {
  const directors = await prisma.director.findMany();

  if (directors.length === mockDirectors.length) return;

  await prisma.director.createMany({ data: mockDirectors });
}

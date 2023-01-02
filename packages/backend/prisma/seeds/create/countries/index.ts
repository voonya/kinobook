import { mockCoutries } from './data';
import { PrismaClient } from '@prisma/client';

export async function seedCountries(prisma: PrismaClient) {
  const countries = await prisma.country.findMany();

  if (countries.length === mockCoutries.length) return;

  await prisma.country.createMany({ data: mockCoutries });
}

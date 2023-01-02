import { mockActors } from './data';
import { PrismaClient } from '@prisma/client';

export async function seedActors(prisma: PrismaClient) {
  const actors = await prisma.actor.findMany();

  if (actors.length === mockActors.length) return;

  await prisma.actor.createMany({ data: mockActors });
}

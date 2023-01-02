import { mockUsers } from './data';
import { PrismaClient } from '@prisma/client';

export async function seedUsers(prisma: PrismaClient) {
  const users = await prisma.user.findMany();

  if (users.length === mockUsers.length) return;

  await prisma.user.createMany({ data: mockUsers });
}

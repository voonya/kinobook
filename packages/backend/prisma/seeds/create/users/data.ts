import { Role as PrismaRole } from '@prisma/client';
import { Role } from '../../../../src/domain/enums';
import { randomUUID } from 'crypto';
import { hashSync } from 'bcrypt';

export const mockUsers = [
  {
    id: randomUUID(),
    username: 'voonya',
    password: hashSync('voonya1234', Number(process.env.HASH_SALT)),
    email: 'voonya@gmail.com',
    role: Role.ADMIN as PrismaRole,
  },
  {
    id: randomUUID(),
    username: 'Moderator',
    password: hashSync('moderator1234', Number(process.env.HASH_SALT)),
    email: 'moderator@gmail.com',
    role: Role.MODERATOR as PrismaRole,
  },
  {
    id: randomUUID(),
    username: 'Octopi',
    password: hashSync('octopi1234', Number(process.env.HASH_SALT)),
    email: 'octopi@gmail.com',
    role: Role.USER as PrismaRole,
  },
  {
    id: randomUUID(),
    username: 'Dreadlight',
    password: hashSync('dreadlight1234', Number(process.env.HASH_SALT)),
    email: 'dreadlight@gmail.com',
    role: Role.USER as PrismaRole,
  },
  {
    id: randomUUID(),
    username: 'Mortician',
    password: hashSync('mortician1234', Number(process.env.HASH_SALT)),
    email: 'mortician@gmail.com',
    role: Role.USER as PrismaRole,
  },
];

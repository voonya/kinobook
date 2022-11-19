import type { User } from '@domain/models';
import type { IUserRepository } from '@domain/repository';
import type { CreateUserDto } from '@domain/contracts';
import type { PrismaService } from './prisma';

class UserRepository implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  getById(id: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { id } });
  }

  getByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  getByUsername(username: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { username } });
  }

  create(user: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: { ...user } });
  }
}

export { UserRepository };

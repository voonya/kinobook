import type { User } from '@domain/models';
import type { IUserRepository } from '@domain/repository';
import type { IRegisterDto } from '@domain/contracts';
import type { PrismaService } from './prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
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

  create(user: IRegisterDto): Promise<User> {
    return this.prisma.user.create({ data: { ...user } });
  }
}

export { UserRepository };

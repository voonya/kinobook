import type { IAuthRepository } from '@domain/repository';
import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma';

@Injectable()
class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService)) private prisma: PrismaService,
  ) {}

  create(userId: string, refreshToken: string) {
    return this.prisma.auth.create({ data: { userId, refreshToken } });
  }

  getByUserIdAndRefreshToken(userId: string, refreshToken: string) {
    return this.prisma.auth.findFirst({ where: { userId, refreshToken } });
  }

  getByRefreshToken(refreshToken: string) {
    return this.prisma.auth.findFirst({ where: { refreshToken } });
  }

  async deleteById(id: string) {
    return await this.prisma.auth.delete({ where: { id } });
  }

  async updateRefreshTokenById(id: string, newRefreshToken: string) {
    return this.prisma.auth.update({
      where: { id },
      data: { refreshToken: newRefreshToken },
    });
  }
}

export { AuthRepository };

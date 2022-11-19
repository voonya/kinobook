import type { IAuthRepository } from '@domain/repository';
import { Injectable } from '@nestjs/common';
import type { PrismaService } from './prisma';

@Injectable()
class AuthRepository implements IAuthRepository {
  constructor(private prisma: PrismaService) {}

  create(userId: string, refreshToken: string) {
    return this.prisma.auth.create({ data: { userId, refreshToken } });
  }

  getByUserIdAndRefreshToken(userId: string, refreshToken: string) {
    return this.prisma.auth.findFirst({ where: { userId, refreshToken } });
  }

  async deleteById(id) {
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

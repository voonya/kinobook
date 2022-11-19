import { Module } from '@nestjs/common';
import { AuthRepository } from './auth';
import { UserRepository } from './user';
import { PrismaService } from './prisma';

@Module({
  providers: [AuthRepository, UserRepository, PrismaService],
  exports: [AuthRepository, UserRepository],
})
export class RepositoriesModule {}

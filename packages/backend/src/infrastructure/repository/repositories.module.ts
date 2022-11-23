import { Module } from '@nestjs/common';
import { AuthRepository } from './auth';
import { UserRepository } from './user';
import { PrismaService } from './prisma/prisma';

@Module({
  providers: [AuthRepository, UserRepository, PrismaService],
  exports: [AuthRepository, UserRepository, PrismaService],
})
export class RepositoriesModule {}

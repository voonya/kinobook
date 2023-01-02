import { Module } from '@nestjs/common';
import { AuthRepository } from './auth';
import { UserRepository } from './user';
import { MovieRepository } from './movie';
import { PrismaService } from './prisma/prisma';
import { ActorRepository } from './actor';
import { GenreRepository } from './genre';
import { DirectorRepository } from './director';
import { CountryRepository } from './country';
import { BookmarkRepository } from './bookmark';
import { ViewedRepository } from './viewed';

@Module({
  providers: [
    AuthRepository,
    UserRepository,
    MovieRepository,
    PrismaService,
    ActorRepository,
    GenreRepository,
    DirectorRepository,
    CountryRepository,
    BookmarkRepository,
    ViewedRepository,
  ],
  exports: [
    AuthRepository,
    UserRepository,
    MovieRepository,
    PrismaService,
    ActorRepository,
    GenreRepository,
    DirectorRepository,
    CountryRepository,
    BookmarkRepository,
    ViewedRepository,
  ],
})
export class RepositoriesModule {}

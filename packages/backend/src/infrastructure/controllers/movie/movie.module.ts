import { RepositoriesModule } from '@infrastructure/repository';
import { MovieController } from './movie.controller';
import {
  UserServiceModule,
  MovieServiceModule,
  FileModule,
} from '@infrastructure/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RepositoriesModule,
    FileModule,
    MovieServiceModule,
    UserServiceModule,
  ],
  providers: [],
  controllers: [MovieController],
})
export class MovieModule {}

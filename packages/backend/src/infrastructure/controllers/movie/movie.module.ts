import { RepositoriesModule } from '@infrastructure/repository';
import { MovieController } from './movie.controller';
import {
  UserServiceModule,
  MovieServiceModule,
  FileModule,
  RecommendationServiceModule,
} from '@infrastructure/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RepositoriesModule,
    FileModule,
    MovieServiceModule,
    UserServiceModule,
    RecommendationServiceModule,
  ],
  providers: [],
  controllers: [MovieController],
})
export class MovieModule {}

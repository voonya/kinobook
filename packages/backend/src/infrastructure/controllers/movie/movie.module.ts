import { Module } from '@nestjs/common';
import { MovieService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule } from '@infrastructure/repository';
import { MovieRepository } from '@infrastructure/repository';
import { MovieController } from './movie.controller';
import { FileModule, FileServiceLocal } from '@infrastructure/services';

@Module({
  imports: [RepositoriesModule, FileModule],
  providers: [
    {
      inject: [MovieRepository, FileServiceLocal],
      provide: InterfacesTokens.MOVIE_SERVICE,
      useFactory: (movieRep: MovieRepository, fileService: FileServiceLocal) =>
        new MovieService(movieRep, fileService),
    },
  ],
  controllers: [MovieController],
})
export class MovieModule {}

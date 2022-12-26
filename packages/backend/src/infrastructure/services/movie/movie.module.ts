import { ViewedRepository } from './../../repository/viewed';
import { Module, forwardRef } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule } from '@infrastructure/repository';
import { MovieService } from '@application/services';
import { FileModule } from '../file';
import { FileServiceLocal } from '../file';
import {
  MovieRepository,
  WriterRepository,
  ActorRepository,
  CountryRepository,
  GenreRepository,
} from '@infrastructure/repository';
import { ViewedServiceModule } from '../viewed';

@Module({
  imports: [
    RepositoriesModule,
    FileModule,
    forwardRef(() => ViewedServiceModule),
  ],
  providers: [
    {
      inject: [
        MovieRepository,
        GenreRepository,
        ActorRepository,
        WriterRepository,
        CountryRepository,
        ViewedRepository,
        FileServiceLocal,
      ],
      provide: InterfacesTokens.MOVIE_SERVICE,
      useFactory: (
        movieRep: MovieRepository,
        genreRep: GenreRepository,
        actorRep: ActorRepository,
        writerRep: WriterRepository,
        countryRep: CountryRepository,
        viewRep: ViewedRepository,
        fileService: FileServiceLocal,
      ) =>
        new MovieService(
          movieRep,
          genreRep,
          actorRep,
          writerRep,
          countryRep,
          viewRep,
          fileService,
        ),
    },
  ],
  exports: [InterfacesTokens.MOVIE_SERVICE],
})
export class MovieServiceModule {}

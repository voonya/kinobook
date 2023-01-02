import { ViewedRepository } from './../../repository/viewed';
import { Module, forwardRef } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule } from '@infrastructure/repository';
import { MovieService } from '@application/services';
import { FileModule } from '../file';
import { FileServiceLocal } from '../file';
import {
  MovieRepository,
  DirectorRepository,
  ActorRepository,
  CountryRepository,
  GenreRepository,
} from '@infrastructure/repository';
import { ViewedServiceModule } from '../viewed';
import { ElasticServiceModule } from '../elastic/elastic.module';
import { ElasticService } from '../elastic/elastic.service';

@Module({
  imports: [
    RepositoriesModule,
    FileModule,
    forwardRef(() => ViewedServiceModule),
    ElasticServiceModule,
  ],
  providers: [
    {
      inject: [
        MovieRepository,
        GenreRepository,
        ActorRepository,
        DirectorRepository,
        CountryRepository,
        ViewedRepository,
        FileServiceLocal,
        ElasticService,
      ],
      provide: InterfacesTokens.MOVIE_SERVICE,
      useFactory: (
        movieRep: MovieRepository,
        genreRep: GenreRepository,
        actorRep: ActorRepository,
        directorRep: DirectorRepository,
        countryRep: CountryRepository,
        viewRep: ViewedRepository,
        fileService: FileServiceLocal,
        elasticService: ElasticService,
      ) =>
        new MovieService(
          movieRep,
          genreRep,
          actorRep,
          directorRep,
          countryRep,
          viewRep,
          fileService,
          elasticService,
        ),
    },
  ],
  exports: [InterfacesTokens.MOVIE_SERVICE],
})
export class MovieServiceModule {}

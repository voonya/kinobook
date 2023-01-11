import { MovieService } from '@application/services';
import {
  MovieRepository,
  DirectorRepository,
  ActorRepository,
  CountryRepository,
  GenreRepository,
  RepositoriesModule,
  ViewedRepository,
} from '@infrastructure/repository';
import { InterfacesTokens } from '@infrastructure/common';
import {
  ViewedServiceModule,
  FileModule,
  FileServiceLocal,
} from '@infrastructure/services';
import { ElasticServiceModule } from './../elastic/elastic.module';
import { ElasticService } from './../elastic/elastic.service';
import { Module, forwardRef } from '@nestjs/common';

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

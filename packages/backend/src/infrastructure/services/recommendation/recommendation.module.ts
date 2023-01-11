import { RecommendationService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  BookmarkRepository,
  RepositoriesModule,
  ViewedRepository,
  MovieRepository,
  DirectorRepository,
  ActorRepository,
  CountryRepository,
  GenreRepository,
} from '@infrastructure/repository';
import { ViewedServiceModule, FileModule } from '@infrastructure/services';
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
        ViewedRepository,
        MovieRepository,
        BookmarkRepository,
        GenreRepository,
        CountryRepository,
        ActorRepository,
        DirectorRepository,
        ElasticService,
      ],
      provide: InterfacesTokens.RECOMMENDATION_SERVICE,
      useFactory: (
        viewRep: ViewedRepository,
        movieRep: MovieRepository,
        bookmarkRep: BookmarkRepository,
        genreRep: GenreRepository,
        countryRep: CountryRepository,
        actorRep: ActorRepository,
        directorRep: DirectorRepository,
        elasticSer: ElasticService,
      ) =>
        new RecommendationService(
          viewRep,
          movieRep,
          bookmarkRep,
          genreRep,
          countryRep,
          actorRep,
          directorRep,
          elasticSer,
        ),
    },
  ],
  exports: [InterfacesTokens.RECOMMENDATION_SERVICE],
})
export class RecommendationServiceModule {}

import { Module } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  GenreRepository,
} from '@infrastructure/repository';
import { GenreController } from './genre.controller';
import { GenreService } from '@application/services';

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      inject: [GenreRepository],
      provide: InterfacesTokens.GENRE_SERVICE,
      useFactory: (genreRep: GenreRepository) => new GenreService(genreRep),
    },
  ],
  controllers: [GenreController],
})
export class GenreModule {}

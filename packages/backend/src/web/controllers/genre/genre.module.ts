import { GenreController } from './genre.controller';
import { GenreService } from '@application/services';
import { UserServiceModule } from '@infrastructure/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  GenreRepository,
} from '@infrastructure/repository';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, UserServiceModule],
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

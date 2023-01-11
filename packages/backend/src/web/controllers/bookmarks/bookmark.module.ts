import { Module } from '@nestjs/common';
import { BookmarkService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule } from '@infrastructure/repository';
import {
  MovieRepository,
  BookmarkRepository,
} from '@infrastructure/repository';
import { BookmarkController } from './bookmark.controller';
import { BcryptModule } from '@infrastructure/services';
import { UserServiceModule } from '@infrastructure/services';
import { JwtModule } from '@infrastructure/services';

@Module({
  imports: [RepositoriesModule, BcryptModule, JwtModule, UserServiceModule],
  providers: [
    {
      inject: [BookmarkRepository, MovieRepository],
      provide: InterfacesTokens.BOOKMARK_SERVICE,
      useFactory: (
        bookmarkRep: BookmarkRepository,
        movieRep: MovieRepository,
      ) => new BookmarkService(bookmarkRep, movieRep),
    },
  ],
  controllers: [BookmarkController],
})
export class BookmarkModule {}

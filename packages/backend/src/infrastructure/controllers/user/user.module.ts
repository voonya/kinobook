import { UserService, BookmarkService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  UserRepository,
  MovieRepository,
  BookmarkRepository,
} from '@infrastructure/repository';
import { JwtModule, JwtService } from '@infrastructure/services';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
  imports: [RepositoriesModule, JwtModule],
  providers: [
    {
      inject: [UserRepository],
      provide: InterfacesTokens.USER_SERVICE,
      useFactory: (userRep: UserRepository) => new UserService(userRep),
    },
    {
      provide: InterfacesTokens.JWT_SERVICE,
      useClass: JwtService,
    },
    {
      inject: [BookmarkRepository, MovieRepository],
      provide: InterfacesTokens.BOOKMARK_SERVICE,
      useFactory: (
        bookmarkRep: BookmarkRepository,
        movieRep: MovieRepository,
      ) => new BookmarkService(bookmarkRep, movieRep),
    },
  ],
  controllers: [UserController],
})
export class UserModule {}

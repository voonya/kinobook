import { UserService } from '@application/services';
import { ViewedService } from '@application/services';
import { MovieService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  ViewedRepository,
} from '@infrastructure/repository';
import { UserServiceModule } from '../user';
import { MovieServiceModule } from '../movie';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, MovieServiceModule, UserServiceModule],
  providers: [
    {
      inject: [
        InterfacesTokens.MOVIE_SERVICE,
        InterfacesTokens.USER_SERVICE,
        ViewedRepository,
      ],
      provide: InterfacesTokens.VIEWED_SERVICE,
      useFactory: (
        movieService: MovieService,
        userService: UserService,
        viewRep: ViewedRepository,
      ) => new ViewedService(movieService, userService, viewRep),
    },
  ],
  exports: [InterfacesTokens.VIEWED_SERVICE],
})
export class ViewedServiceModule {}

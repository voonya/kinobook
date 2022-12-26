import { Module } from '@nestjs/common';
import { UserService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule } from '@infrastructure/repository';
import { ViewedRepository } from '@infrastructure/repository';
import { UserServiceModule } from '../user';
import { ViewedService } from '@application/services';
import { MovieServiceModule } from '../movie';
import { MovieService } from '@application/services';

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

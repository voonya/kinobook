import { Module } from '@nestjs/common';
import { UserService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule } from '@infrastructure/repository';
import { UserRepository } from '@infrastructure/repository';

@Module({
  imports: [RepositoriesModule],
  providers: [
    {
      inject: [UserRepository],
      provide: InterfacesTokens.USER_SERVICE,
      useFactory: (userRep: UserRepository) => new UserService(userRep),
    },
  ],
  exports: [InterfacesTokens.USER_SERVICE],
})
export class UserServiceModule {}

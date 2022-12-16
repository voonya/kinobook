import { UserService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import { RepositoriesModule, UserRepository } from '@infrastructure/repository';
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
  ],
  controllers: [UserController],
})
export class UserModule {}

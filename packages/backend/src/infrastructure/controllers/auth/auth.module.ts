import { Module } from '@nestjs/common';
import { UserService, AuthService } from '@application/services';
import {
  JwtService,
  JwtModule,
  BcryptService,
  BcryptModule,
} from '@infrastructure/services';
import {
  UserRepository,
  AuthRepository,
  RepositoriesModule,
} from '@infrastructure/repository';
import { InterfacesTokens } from '@infrastructure/common';
import { AuthController } from './auth.controller';

@Module({
  imports: [RepositoriesModule, BcryptModule, JwtModule],
  providers: [
    {
      inject: [BcryptService, JwtService, AuthRepository, UserRepository],
      provide: InterfacesTokens.AUTH_SERVICE,
      useFactory: (
        bcrypt: BcryptService,
        jwt: JwtService,
        authRep: AuthRepository,
        userRep: UserRepository,
      ) => new AuthService(authRep, userRep, bcrypt, jwt),
    },
    {
      provide: InterfacesTokens.JWT_SERVICE,
      useClass: JwtService,
    },
    {
      inject: [UserRepository],
      provide: InterfacesTokens.USER_SERVICE,
      useFactory: (userRep: UserRepository) => new UserService(userRep),
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}

import { AuthService } from '@application/services';
import {
  JwtService,
  JwtModule,
  BcryptService,
  BcryptModule,
  UserServiceModule,
} from '@infrastructure/services';
import {
  UserRepository,
  AuthRepository,
  RepositoriesModule,
} from '@infrastructure/repository';
import { InterfacesTokens } from '@infrastructure/common';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, BcryptModule, JwtModule, UserServiceModule],
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
  ],
  controllers: [AuthController],
})
export class AuthModule {}

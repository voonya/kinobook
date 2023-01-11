import { AuthService, UserService } from '@application/services';
import {
  BcryptService,
  JwtService,
  JwtModule,
  BcryptModule,
} from '@infrastructure/services';
import {
  UserRepository,
  AuthRepository,
  RepositoriesModule,
} from '@infrastructure/repository';
import { InterfacesTokens } from '@infrastructure/common';
import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, BcryptModule, JwtModule],
})
export class ServicesProxyModule {
  static register(): DynamicModule {
    return {
      module: ServicesProxyModule,
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
          useFactory: () => new JwtService(),
        },
        {
          inject: [UserRepository],
          provide: InterfacesTokens.USER_SERVICE,
          useFactory: (userRep: UserRepository) => new UserService(userRep),
        },
      ],
    };
  }
}

import { AuthService } from '@application/services/auth';
import { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';
import { JwtService } from '@infrastructure/services/jwt/jwt.service';
import { UserRepository } from '@infrastructure/repository/user';
import { AuthRepository } from '@infrastructure/repository/auth';
import { InterfacesTokens } from '@infrastructure/common';
import { UserService } from '@application/services';
import { JwtModule } from '@infrastructure/services/jwt/jwt.module';
import { BcryptModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { RepositoriesModule } from '@infrastructure/repository/repositories.module';

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

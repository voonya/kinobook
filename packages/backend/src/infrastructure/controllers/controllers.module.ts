import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from '@application/services/auth';
import { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';
import { JwtModule } from './../services/jwt/jwt.module';
import { JwtService } from '@infrastructure/services/jwt/jwt.service';
import { BcryptModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { RepositoriesModule } from '@infrastructure/repository/repositories.module';
import { UserRepository } from '@infrastructure/repository/user';
import { AuthRepository } from '@infrastructure/repository/auth';
import { InterfacesTokens } from '@infrastructure/common';
import { UserService } from '@application/services';

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
export class ControllersModule {}

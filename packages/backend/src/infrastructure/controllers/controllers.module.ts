import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from '@application/services/auth';
import type { BcryptService } from '@infrastructure/services/bcrypt/bcrypt.service';
import { JwtModule } from './../services/jwt/jwt.module';
import type { JwtService } from '@infrastructure/services/jwt/jwt.service';
import { BcryptModule } from '@infrastructure/services/bcrypt/bcrypt.module';
import { RepositoriesModule } from '@infrastructure/repository/repositories.module';
import type { UserRepository } from '@infrastructure/repository/user';
import type { AuthRepository } from '@infrastructure/repository/auth';

@Module({
  imports: [BcryptModule, JwtModule, RepositoriesModule],
  providers: [
    {
      inject: [BcryptModule, JwtModule, RepositoriesModule],
      provide: AuthService,
      useFactory: (
        bcrypt: BcryptService,
        jwt: JwtService,
        userRep: UserRepository,
        authRep: AuthRepository,
      ) => new AuthService(authRep, userRep, bcrypt, jwt),
    },
  ],
  controllers: [AuthController],
})
export class ControllersModule {}

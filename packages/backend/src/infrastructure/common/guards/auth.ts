import { UserService } from './../../../application/services/user';
import { JwtService } from '@infrastructure/services';
import type { CanActivate, ExecutionContext } from '@nestjs/common';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { InterfacesTokens } from '../enums';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(InterfacesTokens.JWT_SERVICE)
    private tokenService: JwtService,
    @Inject(InterfacesTokens.USER_SERVICE)
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization = req?.headers?.authorization?.split(' ');

    if (!authorization) {
      throw new UnauthorizedException('Jwt should be provided!');
    }

    if (authorization[0] !== 'Bearer' || !authorization[1]) {
      throw new UnauthorizedException('Jwt malformed!');
    }

    const user = this.tokenService.parseToken(
      authorization[1],
      process.env.JWT_ACCESS_SECRET,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid jwt!');
    }

    const userInDb = await this.userService.getById(user.id);
    if (!userInDb) {
      throw new BadRequestException('User does not exist!');
    }

    req.user = userInDb;

    return true;
  }
}

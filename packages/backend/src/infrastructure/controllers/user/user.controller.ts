import { ITokenPayload } from '@domain/contracts';
import { IUserService } from '@domain/services/entities/user';
import {
  InterfacesTokens,
  Routes,
  UserReq,
  UserRoutes,
} from '@infrastructure/common';
import { getPath } from '@infrastructure/helpers';
import { JwtUserInterceptor } from '@infrastructure/interceptors';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';

@Controller(getPath(Routes.USER))
export class UserController {
  constructor(
    @Inject(InterfacesTokens.USER_SERVICE) private userService: IUserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(UserRoutes.GET_BY_ID)
  @UseInterceptors(JwtUserInterceptor)
  async getById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Req() req: Request,
    @UserReq() userJwt?: ITokenPayload,
  ) {
    if (userJwt?.id === id) {
      return this.userService.getFullProfile(id);
    }

    return this.userService.getPublicProfile(id);
  }
}

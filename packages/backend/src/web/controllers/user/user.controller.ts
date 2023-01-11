import { IBookmarkService, IUserService } from '@domain/services';
import { ITokenPayload } from '@domain/contracts';
import { InterfacesTokens } from '@infrastructure/common';
import { Routes, UserReq, UserRoutes } from '@web/common';
import { getPath } from '@web/helpers';
import { JwtUserInterceptor } from '@web/interceptors';
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
    @Inject(InterfacesTokens.BOOKMARK_SERVICE)
    private bookmarkService: IBookmarkService,
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

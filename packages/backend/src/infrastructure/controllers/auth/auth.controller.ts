import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { Routes, AuthRoutes } from '@infrastructure/common';
import type { IAuthService } from '@domain/services';

@Controller(Routes.AUTH)
export class AuthController {
  constructor(private authService: IAuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoutes.LOGIN)
  async login() {
    // call method of service

    // return tokens
    console.log(this.authService);

    return { message: 'OK' };
  }

  // @HttpCode(HttpStatus.OK)
  // @Post(AuthRoutes.REGISTER)
  // async registration() {}

  // @HttpCode(HttpStatus.OK)
  // @Post(AuthRoutes.REFRESH)
  // async refresh() {}

  // @HttpCode(HttpStatus.OK)
  // @Post('logout')
  // async logout() {}

  // setRefreshCookieAndAccessToken(
  //   res: Response,
  //   accessToken: string,
  //   refreshToken: string,
  // ) {
  //   res.cookie('refreshToken', refreshToken, {
  //     expires: new Date(
  //       new Date().getTime() +
  //       Number(process.env.TIME_LIVE_JWT_COOKIE_HOURS) * 60 * 60 * 1000,
  //     ),
  //     sameSite: 'strict',
  //     httpOnly: true,
  //     path: '/auth/refresh',
  //   });
  //   res.send({ accessToken });
  //   return res;
  // }
}

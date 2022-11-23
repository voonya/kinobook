import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Inject,
  Body,
  UseGuards,
  Res,
  BadRequestException,
} from '@nestjs/common';
import type { Response } from 'express';
import type { ITokensResponse } from '@domain/contracts';
import type { IAuthService } from '@domain/services';
import type { User } from '@domain/models';
import {
  Routes,
  AuthRoutes,
  CookieName,
  InterfacesTokens,
} from '@infrastructure/common/enums';
import type {
  LoginDto,
  RefreshTokenRequest,
  RegisterDto,
} from '@infrastructure/common/dto';
import { UserReq, Cookies } from '@infrastructure/common/decorators';
import { JwtAuthGuard } from '@infrastructure/common/guards';
import { getPath } from '@infrastructure/helpers';

@Controller(getPath(Routes.AUTH))
export class AuthController {
  constructor(
    @Inject(InterfacesTokens.AUTH_SERVICE) private authService: IAuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoutes.LOGIN)
  async login(@Body() data: LoginDto, @Res() res: Response) {
    const tokens = await this.authService.login(data);

    return this.setRefreshCookieAndAccessToken(res, tokens);
  }

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoutes.REGISTER)
  async registration(@Body() data: RegisterDto, @Res() res: Response) {
    await this.authService.register(data);

    const tokens = await this.authService.login(data);

    return this.setRefreshCookieAndAccessToken(res, tokens);
  }

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoutes.REFRESH)
  async refresh(
    @Cookies() refreshTokenDto: RefreshTokenRequest,
    @Res() res: Response,
  ) {
    if (!refreshTokenDto.refreshToken) {
      throw new BadRequestException('Refresh token must be provided!');
    }

    const tokens = await this.authService.refresh(refreshTokenDto.refreshToken);

    return this.setRefreshCookieAndAccessToken(res, tokens);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Post(AuthRoutes.LOGOUT)
  async logout(
    @UserReq() user: User,
    @Cookies() cookies: RefreshTokenRequest,
    @Res() res,
  ) {
    const userId = user.id;

    await this.authService.logout(userId, cookies[CookieName.REFRESH_TOKEN]);
    res.clearCookie(CookieName.REFRESH_TOKEN);
    res.send({
      message: 'Success!',
    });

    return res;
  }

  setRefreshCookieAndAccessToken(res: Response, tokens: ITokensResponse) {
    res.cookie(CookieName.REFRESH_TOKEN, tokens.refreshToken, {
      expires: new Date(
        new Date().getTime() +
          Number(process.env.TIME_LIVE_JWT_REFRESH_COOKIE_H) * 60 * 60 * 1000,
      ),
      sameSite: 'strict',
      httpOnly: true,
      path: getPath(Routes.AUTH, AuthRoutes.REFRESH),
    });

    res.cookie(CookieName.REFRESH_TOKEN, tokens.refreshToken, {
      expires: new Date(
        new Date().getTime() +
          Number(process.env.TIME_LIVE_JWT_REFRESH_COOKIE_H) * 60 * 60 * 1000,
      ),
      sameSite: 'strict',
      httpOnly: true,
    });
    tokens.accessToken;

    return res.send({ accessToken: tokens.accessToken });
  }
}

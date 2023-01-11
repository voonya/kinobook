import type { ITokensResponse } from '@domain/contracts';
import type { User } from '@domain/models';
import { UserWithoutPassword } from '@domain/models';
import type { IAuthService } from '@domain/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  LoginDto,
  RefreshTokenRequest,
  RegisterDto,
  AuthRoutes,
  CookieName,
  Routes,
  JwtAuthGuard,
  Cookies,
  UserReq,
} from '@web/common';
import { getPath } from '@web/helpers';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

@Controller(getPath(Routes.AUTH))
export class AuthController {
  constructor(
    @Inject(InterfacesTokens.AUTH_SERVICE) private authService: IAuthService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoutes.LOGIN)
  async login(@Body() data: LoginDto, @Res() res: Response) {
    console.log('Login data: ', data);

    const result = await this.authService.login(data);

    return this.setTokensCookie(res, result.tokens).send(result.user);
  }

  @HttpCode(HttpStatus.OK)
  @Post(AuthRoutes.REGISTER)
  async registration(@Body() data: RegisterDto, @Res() res: Response) {
    await this.authService.register(data);

    const result = await this.authService.login(data);

    return this.setTokensCookie(res, result.tokens).send(result.user);
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

    const result = await this.authService.refresh(refreshTokenDto.refreshToken);

    return this.setTokensCookie(res, result.tokens).send(result.user);
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
    console.log(cookies);

    await this.authService.logout(userId, cookies[CookieName.REFRESH_TOKEN]);
    res.clearCookie(CookieName.REFRESH_TOKEN);
    res.clearCookie(CookieName.ACCESS_TOKEN);
    res.send({
      message: 'Success!',
    });

    return res;
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @Get(AuthRoutes.GET_CURRENT)
  async getCurrentUser(@UserReq() user: User) {
    return new UserWithoutPassword(user);
  }

  setTokensCookie(res: Response, tokens: ITokensResponse): Response {
    res.cookie(CookieName.REFRESH_TOKEN, tokens.refreshToken, {
      expires: new Date(
        new Date().getTime() +
          Number(process.env.TIME_LIVE_JWT_REFRESH_COOKIE_M) * 60 * 1000,
      ),
      sameSite: 'strict',
      httpOnly: true,
      path: getPath(Routes.AUTH, AuthRoutes.REFRESH),
    });

    res.cookie(CookieName.REFRESH_TOKEN, tokens.refreshToken, {
      expires: new Date(
        new Date().getTime() +
          Number(process.env.TIME_LIVE_JWT_REFRESH_COOKIE_M) * 60 * 1000,
      ),
      sameSite: 'strict',
      httpOnly: true,
      path: getPath(Routes.AUTH, AuthRoutes.LOGOUT),
    });

    res.cookie(CookieName.ACCESS_TOKEN, tokens.accessToken, {
      sameSite: 'strict',
      expires: new Date(
        new Date().getTime() +
          Number(process.env.TIME_LIVE_JWT_ACCESS_COOKIE_M) * 60 * 1000,
      ),
    });

    return res;
  }
}

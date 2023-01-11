import { User } from '@domain/models';
import type { IViewedService } from '@domain/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  MoviesFiltersDto,
  Routes,
  ViewedRoutes,
  UserReq,
  CreateViewedDto,
  DeleteViewedDto,
} from '@web/common';
import { getPath } from '@web/helpers';
import { JwtAuthGuard } from '@web/common';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  Inject,
  Param,
  ParseUUIDPipe,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

@UseGuards(JwtAuthGuard)
@Controller(getPath(Routes.VIEWED))
export class ViewedController {
  constructor(
    @Inject(InterfacesTokens.VIEWED_SERVICE)
    private viewedService: IViewedService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(ViewedRoutes.GET_IDS_IN_VIEWED)
  async getMovieIdsInViewed(@UserReq() user: User) {
    const views = await this.viewedService.getMovieIdsInViewed(user.id);

    return views;
  }

  @HttpCode(HttpStatus.OK)
  @Get(ViewedRoutes.GET_BY_ID)
  async getViewById(
    @UserReq() user: User,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    const view = await this.viewedService.getById(id, user.id);

    return view;
  }

  @HttpCode(HttpStatus.OK)
  @Get(ViewedRoutes.GET_USER_VIEWED)
  async getUserView(@UserReq() user: User, @Query() filters: MoviesFiltersDto) {
    const views = await this.viewedService.getUserViewed(user.id, filters);

    return views;
  }

  @HttpCode(HttpStatus.OK)
  @Post(ViewedRoutes.UPDATE_BY_ID)
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @UserReq() user: User,
    @Body() data: CreateViewedDto,
  ) {
    const view = await this.viewedService.updateById(id, {
      ...data,
      userId: user.id,
    });

    return view;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(ViewedRoutes.CREATE)
  async create(@UserReq() user: User, @Body() data: CreateViewedDto) {
    const view = await this.viewedService.create({ ...data, userId: user.id });

    return view;
  }

  @HttpCode(HttpStatus.OK)
  @Delete(ViewedRoutes.DELETE_BY_MOVIE_ID)
  async delete(@UserReq() user: User, @Body() data: DeleteViewedDto) {
    const view = await this.viewedService.deleteByMovieId(
      data.movieId,
      user.id,
    );

    return view;
  }
}

import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Delete,
  Inject,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import type { IBookmarkService } from '@domain/services';
import {
  InterfacesTokens,
  CreateBookmarkDto,
  MoviesFiltersDto,
  DeleteBookmarkDto,
} from '@infrastructure/common';
import { Routes, UserRoutes } from '@infrastructure/common';
import { getPath } from '@infrastructure/helpers';
import { JwtAuthGuard } from '@infrastructure/common/guards';
import { UserReq } from '@infrastructure/common';
import { User } from '@domain/models';

@UseGuards(JwtAuthGuard)
@Controller(getPath(Routes.USER))
export class BookmarkController {
  constructor(
    @Inject(InterfacesTokens.BOOKMARK_SERVICE)
    private bookmarkService: IBookmarkService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(UserRoutes.GET_BOOKMARKS)
  async getMoviesInBookmarks(
    @UserReq() user: User,
    @Query() filters: MoviesFiltersDto,
  ) {
    const movies = await this.bookmarkService.getMoviesInUserBookmarks(
      user.id,
      filters,
    );

    return movies;
  }

  @HttpCode(HttpStatus.OK)
  @Get(UserRoutes.GET_BOOKMARK_IDS)
  async getMoviesIdInBookmarks(@UserReq() user: User) {
    const moviesId = await this.bookmarkService.getMoviesIdInUserBookmarks(
      user.id,
    );

    return moviesId;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post(UserRoutes.CREATE_BOOKMARK)
  async create(@UserReq() user: User, @Body() data: CreateBookmarkDto) {
    const bookmark = await this.bookmarkService.create(user.id, data.movieId);

    return bookmark;
  }

  @HttpCode(HttpStatus.OK)
  @Delete(UserRoutes.DELETE_BOOKMARK)
  async delete(@UserReq() user: User, @Body() data: DeleteBookmarkDto) {
    const bookmark = await this.bookmarkService.deleteByUserIdAndMovieId(
      user.id,
      data.movieId,
    );

    return bookmark;
  }
}

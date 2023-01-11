import { User } from '@domain/models';
import type { IBookmarkService } from '@domain/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  CreateBookmarkDto,
  MoviesFiltersDto,
  DeleteBookmarkDto,
  Routes,
  UserRoutes,
  JwtAuthGuard,
  UserReq,
} from '@web/common';
import { getPath } from '@web/helpers';
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

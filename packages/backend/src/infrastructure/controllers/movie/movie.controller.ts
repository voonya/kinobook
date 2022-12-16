import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Get,
  Delete,
  Inject,
  Param,
  ParseUUIDPipe,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IMovieService } from '@domain/services';
import { File } from '@domain/models';
import { InterfacesTokens, CreateMovieDto } from '@infrastructure/common';
import { Routes, MovieRoutes } from '@infrastructure/common';
import { getPath } from '@infrastructure/helpers';

@Controller(getPath(Routes.MOVIES))
export class MovieController {
  constructor(
    @Inject(InterfacesTokens.MOVIE_SERVICE) private movieService: IMovieService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(MovieRoutes.GET_BY_ID)
  async getById(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    console.log(id);

    const movie = await this.movieService.getById(id);

    return movie;
  }

  @HttpCode(HttpStatus.OK)
  @Post(MovieRoutes.CREATE)
  @UseInterceptors(FileInterceptor('poster'))
  async create(
    @Body() data: CreateMovieDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    const newMovie = {
      ...data,
      genres: [].concat(data.genres).map((el) => ({ id: el, name: 'foo' })),
      countries:
        data.countries &&
        [].concat(data.countries).map((el) => ({ id: el, name: 'foo' })),
      writers:
        data.writers &&
        []
          .concat(data.writers)
          .map((el) => ({ id: el, name: 'foo', surname: 'foo' })),
      actors:
        data.actors &&
        []
          .concat(data.actors)
          .map((el) => ({ id: el, name: 'foo', surname: 'foo' })),
    };

    console.log(newMovie);

    console.log(poster);

    let posterObj: File;
    if (poster) {
      posterObj = {
        name: poster.originalname,
        type: poster.mimetype,
        buffer: poster.buffer,
      };
    }

    return this.movieService.createMovie(newMovie, posterObj);
  }

  @HttpCode(HttpStatus.OK)
  @Put(MovieRoutes.UPDATE_BY_ID)
  @UseInterceptors(FileInterceptor('poster'))
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: CreateMovieDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    const newMovie = {
      ...data,
      genres: [].concat(data.genres).map((el) => ({ id: el, name: 'foo' })),
      countries:
        data.countries &&
        [].concat(data.countries).map((el) => ({ id: el, name: 'foo' })),
      writers:
        data.writers &&
        []
          .concat(data.writers)
          .map((el) => ({ id: el, name: 'foo', surname: 'foo' })),
      actors:
        data.actors &&
        []
          .concat(data.actors)
          .map((el) => ({ id: el, name: 'foo', surname: 'foo' })),
    };

    console.log(newMovie);

    console.log(poster);

    let posterObj: File;
    if (poster) {
      posterObj = {
        name: poster.originalname,
        type: poster.mimetype,
        buffer: poster.buffer,
      };
    }

    return this.movieService.updateById(id, newMovie, posterObj);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(MovieRoutes.DELETE_BY_ID)
  async deleteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.movieService.deleteById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(MovieRoutes.GET_ALL)
  async getAll() {
    return this.movieService.getAll();
  }
}

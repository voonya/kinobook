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
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import type { IMovieService } from '@domain/services';
import { File } from '@domain/models';
import {
  InterfacesTokens,
  CreateMovieDto,
  MoviesFiltersDto,
  PaginationDto,
} from '@infrastructure/common';
import { Routes, MovieRoutes } from '@infrastructure/common';
import { getPath } from '@infrastructure/helpers';
import { Role } from '@domain/enums';
import { CreateMovie } from '@domain/contracts';
import { RolesGuard, JwtAuthGuard } from '@infrastructure/common';

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

  @SetMetadata('roles', [Role.ADMIN, Role.MODERATOR])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post(MovieRoutes.CREATE)
  @UseInterceptors(FileInterceptor('poster'))
  async create(
    @Body() data: CreateMovieDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    const newMovie: CreateMovie = {
      ...optionalFieldsMovie,
      ...data,
      genres: [].concat(data.genres),
      countries: data.countries && [].concat(data.countries),
      writers: data.writers && [].concat(data.writers),
      actors: data.actors && [].concat(data.actors),
    };

    console.log(newMovie);
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

  @SetMetadata('roles', [Role.ADMIN, Role.MODERATOR])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(MovieRoutes.UPDATE_BY_ID)
  @UseInterceptors(FileInterceptor('poster'))
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: CreateMovieDto,
    @UploadedFile() poster?: Express.Multer.File,
  ) {
    console.log(data);

    const newMovie = {
      ...optionalFieldsMovie,
      ...data,
      genres: [].concat(data.genres),
      countries: data.countries && [].concat(data.countries),
      writers: data.writers && [].concat(data.writers),
      actors: data.actors && [].concat(data.actors),
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

  @SetMetadata('roles', [Role.ADMIN, Role.MODERATOR])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(MovieRoutes.DELETE_BY_ID)
  async deleteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.movieService.deleteById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Get(MovieRoutes.GET_ALL)
  async getAll(@Query() filters: MoviesFiltersDto) {
    console.log(filters);

    return this.movieService.getFiltered(filters);
  }

  @HttpCode(HttpStatus.OK)
  @Get(MovieRoutes.GET_VIEWES)
  async getViews(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Query() pagination: PaginationDto,
  ) {
    return this.movieService.getViews(id, pagination);
  }
}

const optionalFieldsMovie: CreateMovie = {
  title: null,
  description: null,
  tagline: null,
  runtime: null,
  budget: null,
  revenue: null,
  poster: null,
  releaseDate: null,
  genres: null,
  writers: null,
  countries: null,
  actors: null,
};

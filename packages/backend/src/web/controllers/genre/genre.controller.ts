import type { IGenreService } from '@domain/services';
import { Role } from '@domain/enums';
import { InterfacesTokens } from '@infrastructure/common';
import {
  CreateGenreDto,
  GenreRoutes,
  Routes,
  UpdateGenreDto,
  JwtAuthGuard,
  RolesGuard,
} from '@web/common';
import { getPath } from '@web/helpers';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';

@SetMetadata('roles', [Role.ADMIN, Role.MODERATOR])
@Controller(getPath(Routes.GENRES))
export class GenreController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE) private genreService: IGenreService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post(GenreRoutes.CREATE)
  async create(@Body() data: CreateGenreDto) {
    return this.genreService.create({ name: data.name });
  }

  @HttpCode(HttpStatus.OK)
  @Get(GenreRoutes.GET_ALL)
  async getAll() {
    const genres = await this.genreService.getAll();

    return { genres };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(GenreRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateGenreDto,
  ) {
    return this.genreService.updateById(id, { name: data.name });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(GenreRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.genreService.deleteById(id);
  }
}

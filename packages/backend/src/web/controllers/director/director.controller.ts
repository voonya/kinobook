import type { IDirectorService } from '@domain/services';
import { Role } from '@domain/enums';
import { InterfacesTokens } from '@infrastructure/common';
import {
  CreateDirectorDto,
  Routes,
  UpdateDirectorDto,
  DirectorRoutes,
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
@Controller(getPath(Routes.DIRECTORS))
export class DirectorController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE)
    private directorService: IDirectorService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post(DirectorRoutes.CREATE)
  async create(@Body() data: CreateDirectorDto) {
    return this.directorService.create({
      name: data.name,
      surname: data.surname,
    });
  }

  @HttpCode(HttpStatus.OK)
  @Get(DirectorRoutes.GET_ALL)
  async getAll() {
    const directors = await this.directorService.getAll();

    return { directors };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(DirectorRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateDirectorDto,
  ) {
    return this.directorService.updateById(id, {
      name: data.name,
      surname: data.surname,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(DirectorRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.directorService.deleteById(id);
  }
}

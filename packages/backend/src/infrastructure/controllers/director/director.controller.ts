import { Director } from '@domain/models';
import type { IDirectorService } from '@domain/services';
import { Role } from '@domain/enums';
import {
  CreateDirectorDto,
  InterfacesTokens,
  Routes,
  UpdateDirectorDto,
  DirectorRoutes,
  JwtAuthGuard,
  RolesGuard,
} from '@infrastructure/common';
import { getPath } from '@infrastructure/helpers';
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
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(getPath(Routes.DIRECTORS))
export class DirectorController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE)
    private directorService: IDirectorService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(DirectorRoutes.CREATE)
  async create(@Body() data: CreateDirectorDto) {
    const newDirector = new Director(data.name, data.surname);

    return this.directorService.create(newDirector);
  }

  @HttpCode(HttpStatus.OK)
  @Get(DirectorRoutes.GET_ALL)
  async getAll() {
    const directors = await this.directorService.getAll();

    return { directors };
  }

  @HttpCode(HttpStatus.OK)
  @Put(DirectorRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateDirectorDto,
  ) {
    const newDirector = new Director(data.name, data.surname);

    return this.directorService.updateById(id, newDirector);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(DirectorRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.directorService.deleteById(id);
  }
}

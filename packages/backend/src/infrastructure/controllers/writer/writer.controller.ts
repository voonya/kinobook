import { Writer } from '@domain/models';
import type { IWriterService } from '@domain/services';
import { Role } from '@domain/enums';
import {
  CreateWriterDto,
  InterfacesTokens,
  Routes,
  UpdateWriterDto,
  WriterRoutes,
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
@Controller(getPath(Routes.WRITERS))
export class WriterController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE)
    private writerService: IWriterService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(WriterRoutes.CREATE)
  async create(@Body() data: CreateWriterDto) {
    const newWriter = new Writer(data.name, data.surname);

    return this.writerService.create(newWriter);
  }

  @HttpCode(HttpStatus.OK)
  @Get(WriterRoutes.GET_ALL)
  async getAll() {
    const writers = await this.writerService.getAll();

    return { writers };
  }

  @HttpCode(HttpStatus.OK)
  @Put(WriterRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateWriterDto,
  ) {
    const newWriter = new Writer(data.name, data.surname);

    return this.writerService.updateById(id, newWriter);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(WriterRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.writerService.deleteById(id);
  }
}

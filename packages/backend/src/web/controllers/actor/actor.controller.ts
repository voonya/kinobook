import { Role } from '@domain/enums';
import type { IActorService } from '@domain/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  ActorRoutes,
  CreateActorDto,
  RolesGuard,
  Routes,
  UpdateActorDto,
  JwtAuthGuard,
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
@Controller(getPath(Routes.ACTORS))
export class ActorController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE) private actorService: IActorService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post(ActorRoutes.CREATE)
  async create(@Body() data: CreateActorDto) {
    return this.actorService.create({ name: data.name, surname: data.surname });
  }

  @HttpCode(HttpStatus.OK)
  @Get(ActorRoutes.GET_ALL)
  async getAll() {
    const actors = await this.actorService.getAll();

    return { actors };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(ActorRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateActorDto,
  ) {
    return this.actorService.updateById(id, {
      name: data.name,
      surname: data.surname,
    });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(ActorRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.actorService.deleteById(id);
  }
}

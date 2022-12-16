import { Actor } from '@domain/models';
import type { IActorService } from '@domain/services';
import {
  ActorRoutes,
  CreateActorDto,
  InterfacesTokens,
  Routes,
  UpdateActorDto,
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
} from '@nestjs/common';

@Controller(getPath(Routes.ACTORS))
export class ActorController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE) private actorService: IActorService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(ActorRoutes.CREATE)
  async create(@Body() data: CreateActorDto) {
    const newActor = new Actor(data.name, data.surname);

    return this.actorService.create(newActor);
  }

  @HttpCode(HttpStatus.OK)
  @Get(ActorRoutes.GET_ALL)
  async getAll() {
    const actors = await this.actorService.getAll();

    return { actors };
  }

  @HttpCode(HttpStatus.OK)
  @Put(ActorRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateActorDto,
  ) {
    const newActor = new Actor(data.name, data.surname);

    return this.actorService.updateById(id, newActor);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(ActorRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.actorService.deleteById(id);
  }
}

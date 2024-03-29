import type { ICountryService } from '@domain/services';
import { Role } from '@domain/enums';
import { InterfacesTokens } from '@infrastructure/common';
import {
  CountryRoutes,
  CreateCountryDto,
  Routes,
  UpdateCountryDto,
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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';

@SetMetadata('roles', [Role.ADMIN, Role.MODERATOR])
@Controller(getPath(Routes.COUNTRIES))
export class CountryController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE)
    private countryService: ICountryService,
  ) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Post(CountryRoutes.CREATE)
  async create(@Body() data: CreateCountryDto) {
    return this.countryService.create({ name: data.name });
  }

  @HttpCode(HttpStatus.OK)
  @Get(CountryRoutes.GET_ALL)
  async getAll() {
    const countries = await this.countryService.getAll();

    return { countries };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Put(CountryRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateCountryDto,
  ) {
    return this.countryService.updateById(id, { name: data.name });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @Delete(CountryRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.countryService.deleteById(id);
  }
}

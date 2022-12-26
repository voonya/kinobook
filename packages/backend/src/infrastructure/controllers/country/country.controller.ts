import { Country } from '@domain/models';
import type { ICountryService } from '@domain/services';
import { Role } from '@domain/enums';
import {
  CountryRoutes,
  CreateCountryDto,
  InterfacesTokens,
  Routes,
  UpdateCountryDto,
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
  UseGuards,
  SetMetadata,
} from '@nestjs/common';

@SetMetadata('roles', [Role.ADMIN, Role.MODERATOR])
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(getPath(Routes.COUNTRIES))
export class CountryController {
  constructor(
    @Inject(InterfacesTokens.GENRE_SERVICE)
    private countryService: ICountryService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post(CountryRoutes.CREATE)
  async create(@Body() data: CreateCountryDto) {
    const newCountry = new Country(data.name);

    return this.countryService.create(newCountry);
  }

  @HttpCode(HttpStatus.OK)
  @Get(CountryRoutes.GET_ALL)
  async getAll() {
    const countries = await this.countryService.getAll();

    return { countries };
  }

  @HttpCode(HttpStatus.OK)
  @Put(CountryRoutes.UPDATE_BY_ID)
  async updateById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() data: UpdateCountryDto,
  ) {
    const newCountry = new Country(data.name);

    return this.countryService.updateById(id, newCountry);
  }

  @HttpCode(HttpStatus.OK)
  @Delete(CountryRoutes.DELETE_BY_ID)
  async delteById(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return this.countryService.deleteById(id);
  }
}

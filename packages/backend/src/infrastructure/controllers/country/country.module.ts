import { Module } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  CountryRepository,
} from '@infrastructure/repository';
import { CountryController } from './country.controller';
import { CountryService } from '@application/services';
import { UserServiceModule } from '@infrastructure/services';

@Module({
  imports: [RepositoriesModule, UserServiceModule],
  providers: [
    {
      inject: [CountryRepository],
      provide: InterfacesTokens.GENRE_SERVICE,
      useFactory: (countryRep: CountryRepository) =>
        new CountryService(countryRep),
    },
  ],
  controllers: [CountryController],
})
export class CountryModule {}

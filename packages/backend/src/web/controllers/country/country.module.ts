import { CountryService } from '@application/services';
import {
  RepositoriesModule,
  CountryRepository,
} from '@infrastructure/repository';
import { UserServiceModule } from '@infrastructure/services';
import { InterfacesTokens } from '@infrastructure/common';
import { CountryController } from './country.controller';
import { Module } from '@nestjs/common';

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

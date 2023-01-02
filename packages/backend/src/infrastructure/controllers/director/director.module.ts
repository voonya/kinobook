import { DirectorService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  DirectorRepository,
} from '@infrastructure/repository';
import { DirectorController } from './director.controller';
import { UserServiceModule } from '@infrastructure/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, UserServiceModule],
  providers: [
    {
      inject: [DirectorRepository],
      provide: InterfacesTokens.GENRE_SERVICE,
      useFactory: (directorRep: DirectorRepository) =>
        new DirectorService(directorRep),
    },
  ],
  controllers: [DirectorController],
})
export class DirectorModule {}

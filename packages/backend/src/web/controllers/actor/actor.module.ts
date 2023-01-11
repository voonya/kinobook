import { ActorService } from '@application/services';
import {
  RepositoriesModule,
  ActorRepository,
} from '@infrastructure/repository';
import { UserServiceModule } from '@infrastructure/services';
import { InterfacesTokens } from '@infrastructure/common';
import { ActorController } from './actor.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, UserServiceModule],
  providers: [
    {
      inject: [ActorRepository],
      provide: InterfacesTokens.GENRE_SERVICE,
      useFactory: (actorRep: ActorRepository) => new ActorService(actorRep),
    },
  ],
  controllers: [ActorController],
})
export class ActorModule {}

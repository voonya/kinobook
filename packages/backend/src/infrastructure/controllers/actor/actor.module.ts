import { Module } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  ActorRepository,
} from '@infrastructure/repository';
import { ActorController } from './actor.controller';
import { ActorService } from '@application/services';

@Module({
  imports: [RepositoriesModule],
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

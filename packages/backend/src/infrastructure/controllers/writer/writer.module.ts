import { WriterService } from '@application/services';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  WriterRepository,
} from '@infrastructure/repository';
import { WriterController } from './writer.controller';
import { UserServiceModule } from '@infrastructure/services';
import { Module } from '@nestjs/common';

@Module({
  imports: [RepositoriesModule, UserServiceModule],
  providers: [
    {
      inject: [WriterRepository],
      provide: InterfacesTokens.GENRE_SERVICE,
      useFactory: (writerRep: WriterRepository) => new WriterService(writerRep),
    },
  ],
  controllers: [WriterController],
})
export class WriterModule {}

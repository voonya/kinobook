import { Module } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import {
  RepositoriesModule,
  WriterRepository,
} from '@infrastructure/repository';
import { WriterController } from './writer.controller';
import { WriterService } from '@application/services';

@Module({
  imports: [RepositoriesModule],
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

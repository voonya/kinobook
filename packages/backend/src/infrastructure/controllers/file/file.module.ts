import { Module } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import { FileModule, FileServiceLocal } from '@infrastructure/services';
import { FileController } from './file.controller';

@Module({
  imports: [FileModule],
  providers: [
    {
      inject: [FileServiceLocal],
      provide: InterfacesTokens.FILE_SERVICE,
      useClass: FileServiceLocal,
    },
  ],
  controllers: [FileController],
})
export class FileControllerModule {}

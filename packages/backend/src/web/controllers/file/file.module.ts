import { FileModule, FileServiceLocal } from '@infrastructure/services';
import { InterfacesTokens } from '@infrastructure/common';
import { FileController } from './file.controller';
import { Module } from '@nestjs/common';

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

import { Module } from '@nestjs/common';
import { FileServiceLocal } from './local-file.service';

@Module({
  providers: [FileServiceLocal],
  exports: [FileServiceLocal],
})
export class FileModule {}

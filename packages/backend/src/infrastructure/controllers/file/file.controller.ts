import type { IFileService } from '@domain/services';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { FileRoutes, InterfacesTokens, Routes } from '@infrastructure/common';
import { getPath } from '@infrastructure/helpers';

@Controller(getPath(Routes.FILE))
export class FileController {
  constructor(
    @Inject(InterfacesTokens.FILE_SERVICE) private fileService: IFileService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get(FileRoutes.GET_BY_ID)
  async getById(@Param('id') id: string, @Res() res: Response) {
    const filePath = await this.fileService.getFile(id);

    return res.sendFile(filePath);
  }
}

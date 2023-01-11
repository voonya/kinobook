import type { IFileService } from '@domain/services';
import { InterfacesTokens } from '@infrastructure/common';
import { FileRoutes, Routes } from '@web/common';
import { getPath } from '@web/helpers';
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

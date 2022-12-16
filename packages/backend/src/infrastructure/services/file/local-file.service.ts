import { File } from '@domain/models';
import type { IFileService } from '@domain/services';
import { randomUUID } from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { FileNotFoundError } from './exceptions';

class FileServiceLocal implements IFileService {
  private filePath: string;

  constructor() {
    this.filePath = path.resolve(process.cwd(), process.env.FILE_PATH);
    if (!fs.existsSync(this.filePath)) {
      fs.mkdirSync(this.filePath);
    }
  }

  async saveFile(file: File): Promise<string> {
    const splitedName = file.name.split('.');
    const extension = splitedName[splitedName.length - 1];

    const filename = `${randomUUID()}.${extension}`;

    await fs.writeFile(
      path.resolve(this.filePath, filename),
      file.buffer,
      () => {},
    );

    return filename;
  }

  deleteFile(name: string): Promise<void> {
    if (!this.isFileExist(name)) {
      throw new FileNotFoundError();
    }

    fs.unlink(path.resolve(this.filePath, name), () => {});

    return;
  }

  getFile(name: string): Promise<string> {
    if (!this.isFileExist(name)) {
      throw new FileNotFoundError();
    }

    const filePath = path.resolve(this.filePath, name);

    return new Promise((resolve) => {
      resolve(filePath);
    });
  }

  private isFileExist(filename: string) {
    return fs.existsSync(path.resolve(this.filePath, filename));
  }
}

export { FileServiceLocal };

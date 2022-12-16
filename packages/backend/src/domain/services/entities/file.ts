import { File } from '@domain/models';

export interface IFileService {
  saveFile(file: File): Promise<string>;

  deleteFile(name: string): Promise<void>;

  getFile(name: string): Promise<string>;
}

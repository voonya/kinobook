import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class FileNotFoundError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: 'File not found!',
    });
  }
}

export { FileNotFoundError };

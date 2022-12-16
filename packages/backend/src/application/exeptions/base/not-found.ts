import { HttpError } from '@domain/exceptions';
import { HttpStatusCode } from '@domain/enums';

export class BaseNotFoundError extends HttpError {
  constructor(message: string) {
    super({
      status: HttpStatusCode.NOT_FOUND,
      message,
    });
  }
}

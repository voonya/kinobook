import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class NotLoginedError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: 'You are not logined!',
    });
  }
}

export { NotLoginedError };

import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class AlreadyLogoutError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: 'You are already logout!',
    });
  }
}

export { AlreadyLogoutError };

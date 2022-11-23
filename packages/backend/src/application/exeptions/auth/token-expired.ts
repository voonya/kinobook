import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class TokenExpiredError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: 'Token already expired!',
    });
  }
}

export { TokenExpiredError };

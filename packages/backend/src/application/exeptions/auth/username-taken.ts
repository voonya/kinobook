import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class UsernameTakenError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: 'Username already taken!',
    });
  }
}

export { UsernameTakenError };

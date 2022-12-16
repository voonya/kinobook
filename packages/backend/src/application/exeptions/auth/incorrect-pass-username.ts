import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class IncorrectUsernameOrPasswordError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.NOT_FOUND,
      message: 'Incorrect username or password!',
    });
  }
}

export { IncorrectUsernameOrPasswordError };

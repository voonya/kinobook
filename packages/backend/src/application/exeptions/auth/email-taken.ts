import { HttpStatusCode } from '@domain/enums';
import { HttpError } from '@domain/exceptions';

class EmailTakenError extends HttpError {
  constructor() {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: 'Email already taken!',
    });
  }
}

export { EmailTakenError };

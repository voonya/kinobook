import { HttpStatusCode } from '@domain/enums';

const DEFAULT_MESSAGE = 'Something went wrong';

class HttpError extends Error {
  status: HttpStatusCode;

  constructor({
    status = HttpStatusCode.INTERNAL_SERVER_ERROR,
    message = DEFAULT_MESSAGE,
  } = {}) {
    super(message);
    this.status = status;
  }
}

export { HttpError };

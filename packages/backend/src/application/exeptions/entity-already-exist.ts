import { HttpError } from '@domain/exceptions';
import { HttpStatusCode } from '@domain/enums';

export class EntityAlreadyExistError extends HttpError {
  constructor(entity: string) {
    super({
      status: HttpStatusCode.BAD_REQUEST,
      message: `${entity} already exist!`,
    });
  }
}

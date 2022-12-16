import { BaseNotFoundError } from './base';

export class EntityNotFoundError extends BaseNotFoundError {
  constructor(entityName: string) {
    super(`${entityName} not found!`);
  }
}

import { BaseNotFoundError } from '../base';

export class MovieNotFoundError extends BaseNotFoundError {
  constructor() {
    super('Movie not found!');
  }
}

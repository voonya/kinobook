import type { User } from '@domain/models';

export interface IUserService {
  getById(id: string): Promise<User>;
}

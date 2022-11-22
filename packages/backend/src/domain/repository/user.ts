import type { User } from '@domain/models/user';
import type { IRegisterDto } from '@domain/contracts';

export interface IUserRepository {
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByUsername(username: string): Promise<User>;

  create(user: IRegisterDto): Promise<User>;
}

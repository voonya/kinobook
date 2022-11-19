import type { User } from '@domain/models/user';
import type { CreateUserDto } from '@domain/contracts';

export interface IUserRepository {
  getById(id: string): Promise<User>;
  getByEmail(email: string): Promise<User>;
  getByUsername(username: string): Promise<User>;

  create(user: CreateUserDto): Promise<User>;
}

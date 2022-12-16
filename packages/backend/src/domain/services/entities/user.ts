import type { User, BaseUser, UserWithoutPassword } from '@domain/models';

export interface IUserService {
  getById(id: string): Promise<User>;
  getPublicProfile(id: string): Promise<BaseUser>;
  getFullProfile(id: string): Promise<UserWithoutPassword>;
}

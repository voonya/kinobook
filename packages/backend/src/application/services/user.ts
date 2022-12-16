import type { IUserRepository } from '@domain/repository';
import type { IUserService } from '@domain/services';
import type { User } from '@domain/models';
import { UserWithoutPassword, BaseUser } from '@domain/models';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }

  async getPublicProfile(id: string): Promise<BaseUser> {
    return new BaseUser(await this.getById(id));
  }

  async getFullProfile(id: string): Promise<UserWithoutPassword> {
    return new UserWithoutPassword(await this.getById(id));
  }
}

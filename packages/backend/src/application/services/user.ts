import type { IUserRepository } from '@domain/repository';
import type { IUserService } from '@domain/services';
import type { User } from '@domain/models';

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  getById(id: string): Promise<User> {
    return this.userRepository.getById(id);
  }
}

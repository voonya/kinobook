import { BaseModel } from './base';

export class BaseUser extends BaseModel {
  username: string;

  constructor(user: User) {
    super();
    this.id = user.id;
    this.username = user.username;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

export class UserWithoutPassword extends BaseUser {
  email: string;

  role: string;

  constructor(user: User) {
    super(user);
    this.email = user.email;
    this.role = user.role;
  }
}

export class User extends UserWithoutPassword {
  password: string;
}

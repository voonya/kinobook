import { BaseModel } from './base';

export class UserWithoutPassword extends BaseModel {
  id: string;

  email: string;

  username: string;

  role: string;
}

export class User extends UserWithoutPassword {
  password: string;
}

import { BaseModel } from './base';

export class User extends BaseModel {
  id: string;

  email: string;

  username: string;

  role: string;

  password: string;
}

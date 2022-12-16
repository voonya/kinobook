import { BaseModel } from './base';

export class AuthModel extends BaseModel {
  userId: string;

  refreshToken: string;
}

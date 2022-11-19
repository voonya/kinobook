import { BaseModel } from './base';

export class AuthModel extends BaseModel {
  id: string;

  userId: string;

  refreshToken: string;
}

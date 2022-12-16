import type { BaseModel } from './base';
import type { Role } from '@common';

interface IUser extends BaseModel {
  email: string;
  username: string;
  role: Role;
  avatar?: string;
}

export type { IUser };

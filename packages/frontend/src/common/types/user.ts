import type { Role } from '../enums';

interface IUser {
  id: string;
  email: string;
  username: string;
  role: Role;
  avatar?: string;

  createdAt?: string;
  updatedAt?: string;
}

export type { IUser };

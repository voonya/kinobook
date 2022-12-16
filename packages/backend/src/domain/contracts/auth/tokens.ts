import { UserWithoutPassword } from '@domain/models/user';

export interface ITokensResponse {
  accessToken: string;
  refreshToken: string;
}

export interface ITokensAndUserResponse {
  tokens: ITokensResponse;
  user: UserWithoutPassword;
}

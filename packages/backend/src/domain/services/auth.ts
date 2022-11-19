import type { TokensResponse } from '@domain/contracts';

export interface IAuthService {
  login(email: string, password: string): Promise<TokensResponse>;

  register(
    email: string,
    username: string,
    password: string,
  ): Promise<TokensResponse>;

  logout(userId: string, refreshToken: string): Promise<void>;

  refresh(userId: string, refreshToken: string): Promise<string>;
}

import type { TokensResponse, LoginDto, IRegisterDto } from '@domain/contracts';

export interface IAuthService {
  login(data: LoginDto): Promise<TokensResponse>;

  register(data: IRegisterDto): Promise<TokensResponse>;

  logout(userId: string, refreshToken: string): Promise<void>;

  refresh(refreshToken: string): Promise<TokensResponse>;
}

import type {
  ITokensResponse,
  ILoginDto,
  IRegisterDto,
} from '@domain/contracts';

export interface IAuthService {
  login(data: ILoginDto): Promise<ITokensResponse>;

  register(data: IRegisterDto): Promise<ITokensResponse>;

  logout(userId: string, refreshToken: string): Promise<void>;

  refresh(refreshToken: string): Promise<ITokensResponse>;
}

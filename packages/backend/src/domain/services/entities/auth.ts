import type {
  ITokensAndUserResponse,
  ILoginDto,
  IRegisterDto,
} from '@domain/contracts';

export interface IAuthService {
  login(data: ILoginDto): Promise<ITokensAndUserResponse>;

  register(data: IRegisterDto): Promise<ITokensAndUserResponse>;

  logout(userId: string, refreshToken: string): Promise<void>;

  refresh(refreshToken: string): Promise<ITokensAndUserResponse>;
}

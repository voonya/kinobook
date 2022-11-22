import type { ITokenPayload } from '@domain/contracts';

export interface IJwtService {
  parseToken(token: string, secret: string): ITokenPayload;
  createToken(
    payload: ITokenPayload,
    secret: string,
    expiresIn: string,
  ): string;
}

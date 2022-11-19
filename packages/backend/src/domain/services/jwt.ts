export interface IJwtService {
  parseToken(token: string, secret: string): any;
  createToken(payload: any, secret: string, expiresIn: string): string;
}

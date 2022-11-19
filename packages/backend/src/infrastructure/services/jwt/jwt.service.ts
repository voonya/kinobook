import type { IJwtService } from '@domain/services';
import * as jwt from 'jsonwebtoken';

class JwtService implements IJwtService {
  parseToken(token: string, secret: string): any {
    try {
      return jwt.verify(token, secret);
    } catch {
      return null;
    }
  }

  createToken(payload: any, secret: string, expiresIn: string): string {
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}

export { JwtService };

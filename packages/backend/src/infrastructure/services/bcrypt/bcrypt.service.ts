import type { IBcryptService } from '@domain/services';
import * as bcrypt from 'bcrypt';

class BcryptService implements IBcryptService {
  comparePasswords(hashedPassword: string, password: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  hash(data: string): Promise<string> {
    return bcrypt.hash(data, process.env.HASH_SALT);
  }
}

export { BcryptService };

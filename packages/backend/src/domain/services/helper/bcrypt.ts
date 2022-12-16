export interface IBcryptService {
  hash(data: string): Promise<string>;
  comparePasswords(hashedPassword: string, password: string): Promise<boolean>;
}

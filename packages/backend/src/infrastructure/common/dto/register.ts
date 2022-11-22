import type { IRegisterDto } from '@domain/contracts';

export class RegisterDto implements IRegisterDto {
  email: string;

  username: string;

  password: string;
}

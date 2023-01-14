import type { IRegisterDto } from '@domain/contracts';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class RegisterDto implements IRegisterDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(32)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  username: string;

  @MaxLength(32)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}

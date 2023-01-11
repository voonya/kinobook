import type { ILoginDto } from '@domain/contracts';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  MaxLength,
} from 'class-validator';

export class LoginDto implements ILoginDto {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @MaxLength(32)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}

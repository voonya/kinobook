import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateDirectorDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(100)
  @IsString()
  surname: string;
}
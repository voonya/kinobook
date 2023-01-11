import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateGenreDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;
}

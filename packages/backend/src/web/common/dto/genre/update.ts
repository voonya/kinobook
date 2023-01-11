import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateGenreDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;
}

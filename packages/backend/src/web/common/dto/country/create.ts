import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateCountryDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;
}

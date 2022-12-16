import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateCountryDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;
}

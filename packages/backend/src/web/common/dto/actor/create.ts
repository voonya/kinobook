import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';

export class CreateActorDto {
  @MaxLength(50)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(100)
  @IsString()
  surname: string;
}

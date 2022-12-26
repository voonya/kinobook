import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateMovieDto {
  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsNotEmpty()
  title: string;

  @MaxLength(1000)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  description: string;

  @MaxLength(100)
  @MinLength(2)
  @IsString()
  @IsOptional()
  tagline?: string;

  @IsOptional()
  releaseDate?: Date;

  @IsNumber()
  @IsOptional()
  runtime?: number;

  @IsNumber()
  @IsOptional()
  budget?: number;

  @IsNumber()
  @IsOptional()
  revenue?: number;

  @IsString()
  @IsOptional()
  poster?: string;

  @IsUUID('4', { each: true })
  @IsNotEmpty()
  genres: string[];

  @IsUUID('4', { each: true })
  @IsOptional()
  countries?: string[];

  @IsUUID('4', { each: true })
  @IsOptional()
  writers?: string[];

  @IsUUID('4', { each: true })
  @IsOptional()
  actors?: string[];

  @IsOptional()
  trailer?: string;
}

import {
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
  IsString,
  IsOptional,
  IsBoolean,
  MaxLength,
} from 'class-validator';

export class CreateViewedDto {
  @IsNotEmpty()
  @IsUUID('4')
  movieId: string;

  @Min(1)
  @Max(5)
  rate: number;

  @IsNotEmpty()
  @IsBoolean()
  private: boolean;

  @MaxLength(2000)
  @IsString()
  @IsOptional()
  description?: string;
}

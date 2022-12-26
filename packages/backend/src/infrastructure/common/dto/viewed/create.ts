import {
  IsNotEmpty,
  IsUUID,
  Max,
  Min,
  IsString,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateViewedDto {
  @IsNotEmpty()
  @IsUUID('4')
  movieId: string;

  @Min(0)
  @Max(5)
  rate: number;

  @IsNotEmpty()
  @IsBoolean()
  private: boolean;

  @IsString()
  @IsOptional()
  description?: string;
}

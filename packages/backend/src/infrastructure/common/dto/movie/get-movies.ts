import { Type, Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}

class ReleaseDateFilter {
  @IsOptional()
  @IsDateString()
  from: Date;

  @IsOptional()
  @IsDateString()
  to: Date;
}

class AverageRateFilter {
  @IsOptional()
  @IsNumber()
  from: number;

  @IsOptional()
  @IsNumber()
  to: number;
}

export class MoviesFiltersDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsUUID('4', { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  genresId?: string[];

  @IsUUID('4', { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  directorsId?: string[];

  @IsUUID('4', { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  actorsId?: string[];

  @IsUUID('4', { each: true })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  countriesId?: string[];

  @IsOptional()
  @Type(() => ReleaseDateFilter)
  releaseDate?: {
    from?: Date;
    to?: Date;
  };

  @IsOptional()
  @Type(() => AverageRateFilter)
  averageRate?: {
    from?: number;
    to?: number;
  };

  @IsNumber()
  @IsOptional()
  offset?: number;

  @IsNumber()
  @IsOptional()
  limit?: number;
}

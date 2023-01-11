import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteViewedDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string;
}

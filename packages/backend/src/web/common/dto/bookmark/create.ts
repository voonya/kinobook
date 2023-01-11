import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBookmarkDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string;
}

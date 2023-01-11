import { IsNotEmpty, IsUUID } from 'class-validator';

export class DeleteBookmarkDto {
  @IsNotEmpty()
  @IsUUID()
  movieId: string;
}

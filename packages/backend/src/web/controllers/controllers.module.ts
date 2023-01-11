import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { FileControllerModule } from './file/file.module';
import { ActorModule } from './actor/actor.module';
import { DirectorModule } from './director/director.module';
import { GenreModule } from './genre/genre.module';
import { CountryModule } from './country/country.module';
import { BookmarkModule } from './bookmarks/bookmark.module';
import { ViewedModule } from './viewed/viewed.module';

@Module({
  imports: [
    AuthModule,
    MovieModule,
    BookmarkModule,
    UserModule,
    FileControllerModule,
    ActorModule,
    DirectorModule,
    GenreModule,
    CountryModule,
    ViewedModule,
  ],
  providers: [],
})
export class WebModule {}

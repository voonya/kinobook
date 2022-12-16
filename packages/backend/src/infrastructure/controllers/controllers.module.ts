import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { FileControllerModule } from './file/file.module';
import { ActorModule } from './actor/actor.module';
import { WriterModule } from './writer/writer.module';
import { GenreModule } from './genre/genre.module';
import { CountryModule } from './country/country.module';

@Module({
  imports: [
    AuthModule,
    MovieModule,
    UserModule,
    FileControllerModule,
    ActorModule,
    WriterModule,
    GenreModule,
    CountryModule,
  ],
})
export class ControllersModule {}

import { Module } from '@nestjs/common';
import { WebModule } from '@web/controllers/controllers.module';

@Module({
  imports: [WebModule],
  controllers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ViewedController } from './viewed.controller';
import { JwtModule, UserServiceModule } from '@infrastructure/services';
import { ViewedServiceModule } from '@infrastructure/services';

@Module({
  imports: [ViewedServiceModule, UserServiceModule, JwtModule],
  controllers: [ViewedController],
})
export class ViewedModule {}

import { InterfacesTokens } from '@infrastructure/common';
import { JwtService } from './jwt.service';
import { Module, Global } from '@nestjs/common';

@Global()
@Module({
  providers: [
    JwtService,
    {
      provide: InterfacesTokens.JWT_SERVICE,
      useClass: JwtService,
    },
  ],
  exports: [JwtService, InterfacesTokens.JWT_SERVICE],
})
export class JwtModule {}

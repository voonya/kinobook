import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable, Inject } from '@nestjs/common';
import { InterfacesTokens } from '@infrastructure/common';
import { IJwtService } from '@domain/services';

@Injectable()
export class JwtUserInterceptor implements NestInterceptor {
  constructor(
    @Inject(InterfacesTokens.JWT_SERVICE)
    private tokenService: IJwtService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const authorization = request?.headers?.authorization?.split(' ');

    if (authorization && authorization[0] === 'Bearer' && authorization[1]) {
      const user = this.tokenService.parseToken(
        authorization[1],
        process.env.JWT_ACCESS_SECRET,
      );

      request.user = user;
    }

    return next.handle();
  }
}

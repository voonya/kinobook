import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { RequestLoggingInterceptor } from '@infrastructure/interceptors';
import { LoggerService } from '@infrastructure/services';
import { AllExceptionFilter } from '@infrastructure/filters';
import * as cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const logger = new LoggerService();

  app.useGlobalInterceptors(new RequestLoggingInterceptor(logger));
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  logger.log(`Server start on ${process.env.PORT || 8080}`, 'Server');

  await app.listen(Number(process.env.PORT || 8080));
}
bootstrap();

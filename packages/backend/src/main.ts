import { LoggerService } from '@infrastructure/services';
import { RequestLoggingInterceptor } from '@web/interceptors';
import { AllExceptionFilter } from '@web/filters';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    'origin': 'http://localhost:3000',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
    'credentials': true,
  });
  const logger = new LoggerService();

  app.useGlobalInterceptors(new RequestLoggingInterceptor(logger));
  app.use(cookieParser());
  app.useGlobalFilters(new AllExceptionFilter(logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      disableErrorMessages: process.env.NODE_ENV === 'production',
    }),
  );
  logger.log(`Server start on ${process.env.PORT || 8080}`, 'Server');

  await app.listen(Number(process.env.PORT || 8080));
}
bootstrap();

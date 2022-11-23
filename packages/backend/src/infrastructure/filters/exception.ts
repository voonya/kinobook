import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException } from '@nestjs/common';
import type { LoggerService } from '@infrastructure/services';
import { HttpError } from '@domain/exceptions';
import { HttpStatusCode } from '@domain/enums';

interface IError {
  message: string[];
  statusCode: HttpStatusCode;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request: any = ctx.getRequest();

    const status = exception.status ?? HttpStatusCode.INTERNAL_SERVER_ERROR;
    let messageObj: IError;

    // validator error
    if (exception instanceof HttpException) {
      messageObj = <IError>exception.getResponse();
      console.log(messageObj);
    } else if (exception instanceof HttpError) {
      messageObj = { message: [exception.message], statusCode: status };
    } else {
      messageObj = {
        message: [(exception as Error).message],
        statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }

    const responseData = {
      timestamp: new Date().toISOString(),
      statusCode: messageObj.statusCode,
      message: messageObj.message,
    };

    this.logMessage(request, messageObj, status, exception);

    response.status(status).json(responseData);
  }

  private logMessage(
    request: any,
    message: IError,
    status: number,
    exception: any,
  ) {
    if (status === 500) {
      this.logger.error(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} status_code=${
          message.statusCode
        } message=${message.message ? message.message : null}`,
        status >= 500 ? exception.stack : '',
      );
    } else {
      this.logger.warn(
        `End Request for ${request.path}`,
        `method=${request.method} status=${status} status_code=${
          message.statusCode
        } message=${message.message ? message.message : null}`,
      );
    }
  }
}

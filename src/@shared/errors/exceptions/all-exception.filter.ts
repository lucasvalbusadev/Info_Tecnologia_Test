import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { ExceptionError } from './exception.error';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(
    exception: ExceptionError | HttpException | Error,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = 500;
    let responseBody: unknown = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      responseBody = exception.getResponse();
    } else if (exception instanceof ExceptionError) {
      status = exception.errorObject.statusCode || 500;
      responseBody = exception.errorObject;
    } else {
      responseBody = {
        statusCode: status,
        message: exception.message,
        stack: exception.stack,
      };
    }

    this.logger.error(
      `HTTP Status: ${status} Error Message: ${JSON.stringify(responseBody)}`,
    );
    response.status(status).json(responseBody);
  }
}

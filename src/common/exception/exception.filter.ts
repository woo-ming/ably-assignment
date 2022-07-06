import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CommonResponse } from '../response/common-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const name = exception.name;
    const stack = exception.stack;

    if (status != 404) {
      Logger.error(`
            name: ${name},
            message: ${message},
            status: ${status},
            stackTrace: ${stack}
        `);
    }

    const errorMessage: string | object = (exception.getResponse() as any)
      .message;

    response.status(status).json(
      CommonResponse.fail({
        message:
          typeof errorMessage === 'string'
            ? errorMessage
            : typeof errorMessage === 'object'
            ? errorMessage.toString()
            : message,
        statusCode: status,
      }),
    );
  }
}

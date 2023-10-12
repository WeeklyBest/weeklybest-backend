import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

import { IErrorResponse } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | IErrorResponse;

    const isValidationError =
      typeof error !== 'string' && status === HttpStatus.BAD_REQUEST;

    const responseError = isValidationError
      ? { message: error.message[0] }
      : error;

    response.status(status).json(responseError);
  }
}

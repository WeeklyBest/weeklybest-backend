import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { isObject, isString } from 'class-validator';
import { Response } from 'express';

import { IErrorResponse } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | IErrorResponse;

    let errorResponse: IErrorResponse = { message: undefined };

    if (isString(error)) {
      errorResponse.message = error;
    } else if (isObject(error.message)) {
      errorResponse.message = error.message[0];
    } else {
      errorResponse = error;
    }

    response.status(status).json(errorResponse);
  }
}

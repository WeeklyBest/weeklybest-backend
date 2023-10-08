import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response } from 'express';

import { IErrorResponse, IResponseEntity } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as string | IErrorResponse;

    const isValidationError =
      typeof error !== 'string' && error.statusCode === HttpStatus.BAD_REQUEST;

    const responseEntity: IResponseEntity = {
      success: false,
      statusCode: status,
      data: isValidationError ? error.message : error,
    };

    response.status(status).json(responseEntity);
  }
}

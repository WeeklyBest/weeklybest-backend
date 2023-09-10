import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Response } from 'express';
import { map, Observable } from 'rxjs';

import { ResponseEntity } from '../interface';

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse<Response>();
    const status: number = response.statusCode;

    return next.handle().pipe(
      map(
        (data): ResponseEntity => ({
          success: true,
          statusCode: status,
          data,
        }),
      ),
    );
  }
}

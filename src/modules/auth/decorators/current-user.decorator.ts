import { User } from '@/models';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

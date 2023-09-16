import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserRole } from '@/models';

import { STRATEGY } from '../auth.constant';

@Injectable()
export class AdminAuthGuard extends AuthGuard(STRATEGY.ADMIN) {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user && user.role === UserRole.ADMIN) {
      return true;
    }

    throw new UnauthorizedException('액세스 권한이 없습니다.');
  }
}

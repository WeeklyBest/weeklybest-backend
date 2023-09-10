import { PickType } from '@nestjs/swagger';

import { User } from '@/models';

export class JoinForm extends PickType(User, [
  'email',
  'password',
  'name',
  'mobile',
] as const) {}

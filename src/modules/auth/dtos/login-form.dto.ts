import { PickType } from '@nestjs/swagger';

import { User } from '@/models';

export class LoginForm extends PickType(User, ['email', 'password'] as const) {}

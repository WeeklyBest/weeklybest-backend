import { Repository } from 'typeorm';

import { CustomRepository } from '@/common';

import { User } from '../entities';

@CustomRepository(User)
export class UserRepository extends Repository<User> {}

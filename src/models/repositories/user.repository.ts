import { Repository } from 'typeorm';

import { CustomRepository } from '@/common';

import { User } from '../entities';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async findWithPassword(email: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password', 'user_password')
      .where('email = :email', { email })
      .getOne();
  }
}

import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { User } from '@/models';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findWithPassword(email: string) {
    return this.createQueryBuilder('user')
      .addSelect('user.password', 'user_password')
      .where('email = :email', { email })
      .getOne();
  }

  async findWithRefreshToken(id: number) {
    return this.createQueryBuilder('user')
      .addSelect('user.refresh_token', 'user_refresh_token')
      .where('id = :id', { id })
      .getOne();
  }
}

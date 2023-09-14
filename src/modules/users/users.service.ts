import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { USER_ERROR, UserRepository } from '@/models';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(USER_ERROR.NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}

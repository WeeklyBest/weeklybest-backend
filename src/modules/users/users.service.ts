import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { Repository } from 'typeorm';

import { PagingQuery, getPagination } from '@/common';
import { USER_ERROR, User, UserRepository, Wishlist } from '@/models';

import { ProductCardResponse } from '../products';
import { ChangePasswordForm, EditUserRequest } from './dtos';
import { AUTH } from '../auth';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  async getUserById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(USER_ERROR.NOT_FOUND, HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  async editUserInfo({ name, phone }: EditUserRequest, user: User) {
    const result = await this.userRepository.update(user.id, {
      name,
      phone,
    });

    if (!result) {
      throw new HttpException(
        '회원 정보 수정 중 오류가 발생했습니다.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getMyWishlist(user: User, pagingQuery: PagingQuery) {
    const { pageNum, pageSize } = pagingQuery;

    const [wishlist, count] = await this.wishlistRepository.findAndCount({
      relations: ['product', 'product.images'],
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        createdAt: 'DESC',
      },
    });

    const products = wishlist.map(
      (item) => new ProductCardResponse(item.product, true),
    );

    return getPagination(products, count, pagingQuery);
  }

  async changePassword(changePasswordForm: ChangePasswordForm, user: User) {
    const { currentPassword, newPassword, confirmNewPassword } =
      changePasswordForm;

    if (newPassword !== confirmNewPassword) {
      throw new HttpException(
        '새 비밀번호와 비밀번호 확인란이 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new HttpException(
        '현재 비밀번호가 일치하지 않습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, AUTH.SALT);

    await this.userRepository.update(user.id, { password: hashedNewPassword });
  }
}

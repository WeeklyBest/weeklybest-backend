import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PagingQuery, getPagination } from '@/common';
import { USER_ERROR, User, UserRepository, Wishlist } from '@/models';

import { ProductCardResponse } from '../products';
import { EditUserRequest } from './dtos';

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
}

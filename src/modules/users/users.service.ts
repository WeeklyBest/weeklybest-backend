import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { PagingQuery, getPagination } from '@/common';
import { USER_ERROR, User, UserRepository, Wishlist } from '@/models';

import { ProductCardResponse } from '../products';

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

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CART_ERROR, Cart, User } from '@/models';

import { CreateCartDto } from './dtos';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  async create({ variantId, ...rest }: CreateCartDto, user: User) {
    const newCart = await this.cartRepository.save(
      this.cartRepository.create({
        ...rest,
        user,
        variant: { id: variantId },
      }),
    );

    if (!newCart) {
      throw new HttpException(
        CART_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

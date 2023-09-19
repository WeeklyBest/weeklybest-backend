import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CART_ERROR, CartItem, CartRepository, User } from '@/models';

import { CartItemResponse, CreateCartRequest } from './dtos';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async addItem({ variantId, quantity }: CreateCartRequest, user: User) {
    let cart = await this.cartRepository.findOne({ where: { user } });

    if (!cart) {
      cart = await this.cartRepository.save({
        user,
      });
    }

    const result = await this.cartItemRepository.save({
      cart,
      variant: {
        id: variantId,
      },
      quantity,
    });

    if (!result) {
      throw new HttpException(
        CART_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllItems(user: User): Promise<CartItemResponse[]> {
    const cart = await this.cartRepository.findByUserId(user.id);

    if (!cart || !cart.items) return [];

    return cart.items.map((cartItem) => new CartItemResponse(cartItem));
  }

  async removeItem(variantId: number, user: User) {
    const cart = await this.cartRepository.findOne({ where: { user } });

    if (!cart) {
      throw new HttpException(CART_ERROR.CART_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const result = await this.cartItemRepository.delete({
      cart,
      variant: {
        id: variantId,
      },
    });

    if (result.affected <= 0) {
      throw new HttpException(
        CART_ERROR.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

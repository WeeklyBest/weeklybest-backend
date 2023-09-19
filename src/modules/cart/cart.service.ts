import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { CART_ERROR, CartRepository, User } from '@/models';

import { CartItemResponse, CreateCartRequest } from './dtos';

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}

  async add({ variantId, ...rest }: CreateCartRequest, user: User) {
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

  async getAll(user: User): Promise<any> {
    const cartItems = await this.cartRepository.findAllByUserId(user.id);

    return cartItems.map((cartItem) => new CartItemResponse(cartItem));
  }

  async remove(cartId: number, user: User) {
    const result = await this.cartRepository.delete({
      id: cartId,
      user,
    });

    if (result.affected <= 0) {
      throw new HttpException(
        CART_ERROR.DELETE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

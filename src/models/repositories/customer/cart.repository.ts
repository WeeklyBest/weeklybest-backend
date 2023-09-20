import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { Cart } from '@/models/entities';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  findByUserId(userId: number) {
    return this.createQueryBuilder('cart')
      .innerJoinAndSelect('cart.items', 'cartItem')
      .innerJoinAndSelect('cartItem.variant', 'variant')
      .innerJoinAndSelect('variant.product', 'product')
      .innerJoinAndSelect('variant.color', 'color')
      .where('cart.user.id = :userId', { userId })
      .getOne();
  }
}

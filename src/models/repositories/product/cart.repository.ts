import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { Cart } from '@/models/entities';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  findByUserId(userId: number) {
    return this.createQueryBuilder('cart')
      .innerJoinAndSelect('cart.items', 'cartItem')
      .leftJoinAndSelect('cartItem.variant', 'variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('variant.optionValues', 'optionValue')
      .leftJoinAndSelect('optionValue.option', 'option')
      .where('cart.user.id = :userId', { userId })
      .orderBy({ 'option.order': 'ASC' })
      .getOne();
  }
}

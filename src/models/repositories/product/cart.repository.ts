import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { Cart } from '@/models/entities';

@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {
  findAllByUserId(userId: number) {
    return this.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.variant', 'variant')
      .leftJoinAndSelect('variant.product', 'product')
      .leftJoinAndSelect('variant.options', 'variantOption')
      .leftJoinAndSelect('variantOption.value', 'optionValue')
      .leftJoinAndSelect('optionValue.option', 'option')
      .where('cart.user.id = :userId', { userId })
      .orderBy({ 'option.order': 'ASC' })
      .getMany();
  }
}

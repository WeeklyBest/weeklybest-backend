import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { SizeValue } from '@/models/entities';

@EntityRepository(SizeValue)
export class SizeValueRepository extends Repository<SizeValue> {
  async findByProductId(productId: number) {
    return this.createQueryBuilder('sizeValue')
      .innerJoin('sizeValue.variants', 'variant')
      .innerJoin('variant.product', 'product')
      .where('product.id = :productId', { productId })
      .orderBy('sizeValue.order', 'ASC')
      .getMany();
  }
}

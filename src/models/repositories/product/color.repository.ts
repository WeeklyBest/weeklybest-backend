import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { Color } from '@/models/entities';

@EntityRepository(Color)
export class ColorRepository extends Repository<Color> {
  async findByProductId(productId: number) {
    return this.createQueryBuilder('color')
      .innerJoin('color.variants', 'variant')
      .innerJoin('variant.product', 'product')
      .where('product.id = :productId', { productId })
      .getMany();
  }
}

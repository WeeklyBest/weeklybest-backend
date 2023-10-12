import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';

import { User, Wishlist } from '@/models/entities';

@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist> {
  async isProductWished(productId: number, user: User): Promise<boolean> {
    if (!user) return false;

    const result = await this.findOne({
      where: { product: { id: productId }, user: { id: user.id } },
    });

    return !!result;
  }
}

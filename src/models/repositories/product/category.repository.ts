import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';

import { Category } from '@/models/entities';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async findByCode(code: string) {
    return this.findOne({ where: { code } });
  }
}

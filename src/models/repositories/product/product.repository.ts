import { Repository } from 'typeorm';

import { EntityRepository } from '@/common';
import { Product } from '@/models/entities';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}

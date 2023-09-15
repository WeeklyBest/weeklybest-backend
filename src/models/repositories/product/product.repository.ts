import { EntityRepository } from '@/common';
import { Product } from '@/models/entities';
import { Repository } from 'typeorm';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {}

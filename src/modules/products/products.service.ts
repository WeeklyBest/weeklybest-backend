import { Injectable } from '@nestjs/common';

import { Product, ProductRepository } from '@/models';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async list(): Promise<Product[]> {
    const product = await this.productRepository.find({
      where: { show: true },
    });

    return product;
  }
}

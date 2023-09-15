import { Injectable } from '@nestjs/common';

import { Product, ProductRepository } from '@/models';
import { IPagination, IPagingOptions, getPagination } from '@/common';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async list(pagingOptions: IPagingOptions): Promise<IPagination<Product>> {
    const { pageNum, pageSize } = pagingOptions;

    const product = await this.productRepository.findAndCount({
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      where: { display: true },
    });

    return getPagination(product[0], product[1], pagingOptions);
  }
}

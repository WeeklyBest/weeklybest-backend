import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PRODUCT, Product, ProductRepository } from '@/models';

import { CreateProductForm } from './dtos';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async createProduct(createProductForm: CreateProductForm): Promise<void> {
    const { name, retailPrice, sellingPrice, onSale, show } = createProductForm;

    const existsProduct: Product = await this.productRepository.findOne({
      where: { name },
    });

    if (existsProduct) {
      throw new HttpException(
        PRODUCT.CREATE.DUPLICATE_PRODUCT,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.productRepository.insert(
        this.productRepository.create({
          name,
          retailPrice,
          sellingPrice,
          onSale,
          show,
        }),
      );
    } catch (error) {
      throw new HttpException(
        PRODUCT.CREATE.ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

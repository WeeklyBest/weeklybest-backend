import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PRODUCT, Product, ProductRepository } from '@/models';

import { UploadProductForm } from './dtos';

@Injectable()
export class AdminService {
  constructor(private readonly productRepository: ProductRepository) {}

  async uploadProduct(uploadProductForm: UploadProductForm): Promise<void> {
    const { name, retailPrice, sellingPrice, onSale, display } =
      uploadProductForm;

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
          display,
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

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PRODUCT, Product, ProductRepository } from '@/models';

import { UploadProductForm } from './dtos';
import { ERROR } from '@/docs';

@Injectable()
export class AdminService {
  constructor(private readonly productRepository: ProductRepository) {}

  async uploadProduct(uploadProductForm: UploadProductForm): Promise<void> {
    const { name, retailPrice, sellingPrice, display, onSale, category } =
      uploadProductForm;

    const existsProduct: Product = await this.productRepository.findOne({
      where: { name },
    });

    if (existsProduct) {
      throw new BadRequestException(ERROR.PRODUCT.DUPLICATE_PRODUCT);
    }

    try {
      await this.productRepository.insert(
        this.productRepository.create({
          name,
          retailPrice,
          sellingPrice,
          display,
          onSale,
          category,
        }),
      );
    } catch (error) {
      throw new InternalServerErrorException(ERROR.PRODUCT.NOT_FOUND);
    }
  }
}

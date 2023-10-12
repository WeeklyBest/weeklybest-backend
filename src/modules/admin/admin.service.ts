import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { Product, ProductRepository } from '@/models';

import { UploadProductForm } from './dtos';
import { EXCEPTION } from '@/docs';

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
      throw new BadRequestException(EXCEPTION.PRODUCT.DUPLICATE_PRODUCT);
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
      throw new InternalServerErrorException(EXCEPTION.PRODUCT.NOT_FOUND);
    }
  }
}

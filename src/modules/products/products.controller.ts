import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Product } from '@/models';

import { ProductsService } from './products.service';

@ApiTags('상품 API')
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async list(): Promise<Product[]> {
    return this.productsService.list();
  }
}

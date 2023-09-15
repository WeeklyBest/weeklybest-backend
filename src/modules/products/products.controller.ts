import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Product } from '@/models';

import { ProductsService } from './products.service';
import { ProductsControllerDocs as Docs } from './products.controller.docs';

@ApiTags('상품 API')
@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Docs.list('상품 목록 조회')
  @Get()
  async list(): Promise<Product[]> {
    return this.productsService.list();
  }
}

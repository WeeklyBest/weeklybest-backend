import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IPagination } from '@/common';
import { Product } from '@/models';

import { ProductsService } from './products.service';
import { ProductsControllerDocs as Docs } from './products.controller.docs';
import { ProductListQuery } from './dtos';

@ApiTags('상품 API')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Docs.list('상품 목록 조회')
  @Get()
  async list(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<IPagination<Product>> {
    return this.productsService.list({ pageNum, pageSize, ...rest });
  }
}

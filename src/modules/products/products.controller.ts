import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from '@/common';

import { ProductsService } from './products.service';
import { ProductsControllerDocs as Docs } from './products.controller.docs';
import {
  ProductCardResponse,
  ProductDetailResponse,
  ProductIdParam,
  ProductListQuery,
} from './dtos';

@ApiTags('상품 API')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Docs.getAll('상품 목록 조회')
  @Get()
  async getAll(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<ProductCardResponse>> {
    return this.productsService.getAll({ pageNum, pageSize, ...rest });
  }

  @Docs.getOne('상품 상세 정보 조회')
  @Get(':id')
  async getOne(
    @Param() { id }: ProductIdParam,
  ): Promise<ProductDetailResponse> {
    return this.productsService.getOne(id);
  }
}

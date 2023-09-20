import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination } from '@/common';

import {
  ProductCardResponse,
  ProductDetailResponse,
  ProductIdParam,
  ProductListQuery,
} from './dtos';

import { ProductsControllerDoc as Doc } from './controller.doc';
import { ProductsService } from './products.service';

@ApiTags('상품 API')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Doc.getAll('상품 목록 조회')
  @Get()
  async getAll(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<ProductCardResponse>> {
    return this.productsService.getAll({ pageNum, pageSize, ...rest });
  }

  @Doc.getOne('상품 상세 정보 조회')
  @Get(':id')
  async getOne(
    @Param() { id }: ProductIdParam,
  ): Promise<ProductDetailResponse> {
    return this.productsService.getOne(id);
  }
}

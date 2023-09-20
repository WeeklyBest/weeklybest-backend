import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, PagingQuery } from '@/common';

import { ReviewsService } from '../reviews';

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
  constructor(
    private readonly productsService: ProductsService,
    private readonly reviewsService: ReviewsService,
  ) {}

  @Doc.getAll('상품 목록 조회')
  @Get()
  async getAll(
    @Query() { pageNum = 1, pageSize = 10, ...rest }: ProductListQuery,
  ): Promise<Pagination<ProductCardResponse>> {
    return this.productsService.getAll({ pageNum, pageSize, ...rest });
  }

  @Doc.getOne('상품 상세 정보 조회')
  @Get(':productId')
  async getOne(
    @Param() { productId }: ProductIdParam,
  ): Promise<ProductDetailResponse> {
    return this.productsService.getOne(productId);
  }

  @Doc.getReviews('상품 관련 리뷰 목록 조회')
  @Get(':productId/reviews')
  async getReviews(
    @Param() { productId }: ProductIdParam,
    @Query() pagingQuery: PagingQuery,
  ) {
    return this.reviewsService.getReviewsByProductId(productId, pagingQuery);
  }
}

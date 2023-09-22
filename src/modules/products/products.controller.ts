import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { Pagination, PagingQuery } from '@/common';

import { QuestionResponse, QuestionsService } from '../questions';
import { ReviewResponse, ReviewsService } from '../reviews';

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
    private readonly questionsService: QuestionsService,
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
  ): Promise<ReviewResponse[]> {
    return this.reviewsService.getReviewsByProductId(productId, pagingQuery);
  }

  @Doc.getQuestions('상품 관련 문의 목록 조회')
  @Get(':productId/questions')
  async getQuestions(
    @Param() { productId }: ProductIdParam,
    @Query() { pageNum = 1, pageSize = 5 }: PagingQuery,
  ): Promise<Pagination<QuestionResponse>> {
    return this.questionsService.getQuestionByProductId(productId, {
      pageNum,
      pageSize,
    });
  }
}

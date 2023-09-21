import { Pagination, SwaggerMethodDocType } from '@/common';
import { applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  getSchemaPath,
} from '@nestjs/swagger';

import { ProductCardResponse, ProductDetailResponse } from './dtos';

import { ProductsController } from './products.controller';
import { ReviewResponse } from '../reviews/dtos';

export const ProductsControllerDoc: SwaggerMethodDocType<ProductsController> = {
  getAll(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '진열 여부가 true인 상품을 모두 조회합니다.',
      }),
      ApiExtraModels(Pagination, ProductCardResponse),
      ApiOkResponse({
        description: '상품 목록 조회 성공',
        schema: {
          allOf: [
            { $ref: getSchemaPath(Pagination) },
            {
              properties: {
                data: {
                  type: 'array',
                  items: { $ref: getSchemaPath(ProductCardResponse) },
                },
              },
            },
          ],
        },
      }),
    );
  },

  getReviews(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '',
      }),
      ApiOkResponse({
        description: '리뷰 목록 조회 성공',
        type: [ReviewResponse],
      }),
    );
  },

  getOne(summary: string) {
    return applyDecorators(
      ApiOperation({
        summary,
        description: '상품 옵션을 포함한 상품 상세 정보를 조회합니다.',
      }),
      ApiOkResponse({
        description: '상품 상세 정보 조회 성공',
        type: ProductDetailResponse,
      }),
    );
  },

  getQuestions(summary: string) {
    return applyDecorators();
  },
};

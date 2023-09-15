import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

import { SwaggerMethodDocType } from '@/common';

import { ProductsController } from './products.controller';

export const ProductsControllerDocs: SwaggerMethodDocType<ProductsController> =
  {
    createProduct(summary: string) {
      return applyDecorators(
        ApiOperation({
          summary,
          description: '상품의 양식을 받아 상품을 업로드합니다.',
        }),
        ApiCreatedResponse({ description: '상품 업로드 성공' }),
        ApiBadRequestResponse({ description: '잘못된 인증 정보 입력' }),
        ApiInternalServerErrorResponse({
          description: '알 수 없는 서버 에러',
        }),
      );
    },
  };

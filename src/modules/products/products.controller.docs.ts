import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';

import { SwaggerMethodDocType } from '@/common';

import { ProductsController } from './products.controller';

export const ProductsControllerDocs: SwaggerMethodDocType<ProductsController> =
  {
    list(summary: string) {
      return applyDecorators(
        ApiOperation({
          summary,
          description: '진열 여부가 true인 상품을 모두 조회합니다.',
        }),
      );
    },
  };

import { IsOptional } from 'class-validator';

import { PagingQuery } from '@/common';
import { ProductSort } from '@/models';

import { ProductRequestDto } from '../decorators';

export class ProductListQuery extends PagingQuery {
  @ProductRequestDto.category()
  @IsOptional()
  category: string;

  @ProductRequestDto.sort()
  @IsOptional()
  sort: ProductSort;
}

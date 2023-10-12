import { PagingQuery } from '@/common';
import { PurchasedProductFilter } from '@/models';

import { ProductRequestDto } from '../decorators';

export class ReviewableProductQuery extends PagingQuery {
  @ProductRequestDto.reviewableFilter()
  filter: PurchasedProductFilter;
}

import { ApiPropertyOptional } from '@nestjs/swagger';

import { PagingQuery } from '@/common';
import { ReviewSort } from '@/models';

export class ReviewListQuery extends PagingQuery {
  @ApiPropertyOptional({
    description: '정렬 기준',
    example: ReviewSort.RATING_DESC,
  })
  sort: ReviewSort;
}

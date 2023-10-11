import { IsOptional } from 'class-validator';

import { PagingQuery } from '@/common';
import { ReviewSort } from '@/models';

import { ReviewRequestDto } from '../decorators';

export class ReviewListQuery extends PagingQuery {
  @ReviewRequestDto.sort()
  @IsOptional()
  sort: ReviewSort;
}

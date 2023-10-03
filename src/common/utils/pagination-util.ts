import { Pagination } from '../dtos';
import { IPagingOptions } from '../interface';

export function getPagination<T>(
  list: T[],
  totalElements: number,
  { pageNum, pageSize }: IPagingOptions,
): Pagination<T> {
  const totalPages = Math.ceil(totalElements / pageSize);

  return {
    list,
    totalElements,
    totalPages,
    pageNum,
    pageSize,
    isFirst: pageNum === 1,
    isLast: pageNum === totalPages,
  };
}

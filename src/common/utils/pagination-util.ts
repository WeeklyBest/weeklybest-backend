import { Pagination } from '../dto';
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
    isFirst: pageNum === 1,
    isLast: pageNum === totalPages,
  };
}

import { IPagination, IPagingOptions } from '../interface';

export function getPagination<T>(
  list: T[],
  totalElements: number,
  { pageNum, pageSize }: IPagingOptions,
): IPagination<T> {
  const totalPages = Math.ceil(totalElements / pageSize);

  return {
    list,
    totalPages,
    isFirst: pageNum === 1,
    isLast: pageNum === totalPages,
  };
}

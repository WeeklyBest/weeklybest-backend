import { DataSource, EntityManager, SelectQueryBuilder } from 'typeorm';

import { PagingQuery } from '../dtos';

export async function useTransaction(
  dataSource: DataSource,
  fn: (entityManager: EntityManager) => Promise<void>,
) {
  const queryRunner = dataSource.createQueryRunner();
  await queryRunner.connect();

  await queryRunner.startTransaction();
  try {
    await fn(queryRunner.manager);
    await queryRunner.commitTransaction();
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}

export function setQuerySkipAndTake<T>(
  query: SelectQueryBuilder<T>,
  { pageNum, pageSize }: PagingQuery,
) {
  query.skip((pageNum - 1) * pageSize).take(pageSize);
}

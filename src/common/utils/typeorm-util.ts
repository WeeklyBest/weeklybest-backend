import { DataSource, EntityManager } from 'typeorm';

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
  } catch (err) {
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
  }
}

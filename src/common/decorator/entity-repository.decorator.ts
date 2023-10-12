import { SetMetadata } from '@nestjs/common';

type EntityClass<T = any> = new (...args: any[]) => T;

export const TYPEORM_CUSTOM_REPOSITORY = 'TYPEORM_CUSTOM_REPOSITORY';

export function EntityRepository(entity: EntityClass): ClassDecorator {
  return SetMetadata(TYPEORM_CUSTOM_REPOSITORY, entity);
}

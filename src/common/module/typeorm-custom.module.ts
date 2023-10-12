import { DynamicModule, Provider, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { TYPEORM_CUSTOM_REPOSITORY } from '../decorator';

export class TypeOrmCustomModule {
  public static forFeature<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_CUSTOM_REPOSITORY, repository);

      if (!entity) {
        throw new NotFoundException(
          `${repository.name} 레파지토리에 대한 엔티티를 찾을 수 없습니다.`,
        );
      }

      providers.push({
        inject: [getDataSourceToken()],
        provide: repository,
        useFactory: (dataSource: DataSource) => {
          const baseRepository =
            dataSource.getRepository<typeof entity>(entity);
          return new repository(
            baseRepository.target,
            baseRepository.manager,
            baseRepository.queryRunner,
          );
        },
      });
    }

    return {
      exports: providers,
      module: TypeOrmCustomModule,
      providers,
    };
  }
}

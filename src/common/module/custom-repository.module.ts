import { DynamicModule, Provider, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { TYPEORM_CUSTOM_REPOSITORY } from '../decorator';

export class CustomRepositoryModule {
  public static forCustomRepository<T extends new (...args: any[]) => any>(
    repositories: T[],
  ): DynamicModule {
    const providers: Provider[] = [];

    for (const repository of repositories) {
      const entity = Reflect.getMetadata(TYPEORM_CUSTOM_REPOSITORY, repository);

      if (!entity) {
        throw new NotFoundException(
          `Entity not found for repository ${repository.name}`,
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
      module: CustomRepositoryModule,
      providers,
    };
  }
}

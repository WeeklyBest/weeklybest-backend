import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import { CategoryRepository, ProductRepository } from '@/models';

import { UsersModule } from '@/modules/users';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([ProductRepository, CategoryRepository]),
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

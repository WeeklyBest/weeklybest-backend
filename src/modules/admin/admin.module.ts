import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import { CategoryRepository, ProductImage, ProductRepository } from '@/models';

import { UsersModule } from '@/modules/users';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductImage]),
    TypeOrmCustomModule.forFeature([ProductRepository, CategoryRepository]),
    UsersModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

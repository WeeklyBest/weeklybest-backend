import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import { ProductRepository } from '@/models';
import { UsersModule } from '@/modules/users';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([ProductRepository]), UsersModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}

import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import { ProductRepository } from '@/models';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([ProductRepository])],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

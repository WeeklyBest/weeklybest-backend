import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from '@/models';

@Module({
  imports: [TypeOrmModule.forFeature([Order])],
})
export class OrdersModule {}

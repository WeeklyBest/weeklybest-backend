import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmCustomModule } from '@/common';
import { CartItem, CartRepository } from '@/models';

import { CartItemController } from './cart-item.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([CartRepository]),
    TypeOrmModule.forFeature([CartItem]),
  ],
  controllers: [CartItemController],
  providers: [CartService],
})
export class CartModule {}

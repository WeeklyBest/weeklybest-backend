import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmCustomModule } from '@/common';
import { CartItem, CartRepository, Variant } from '@/models';

import { CartController } from './cart.controller';
import { CartItemController } from './cart-item.controller';
import { CartService } from './cart.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([CartRepository]),
    TypeOrmModule.forFeature([CartItem, Variant]),
  ],
  controllers: [CartController, CartItemController],
  providers: [CartService],
})
export class CartModule {}

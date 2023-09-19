import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import { CartRepository } from '@/models';

import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  imports: [TypeOrmCustomModule.forFeature([CartRepository])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}

import { Module } from '@nestjs/common';

import { TypeOrmCustomModule } from '@/common';
import {
  CategoryRepository,
  ColorRepository,
  ProductRepository,
  SizeValueRepository,
  WishlistRepository,
} from '@/models';

import { QuestionsModule } from '../questions';
import { ReviewsModule } from '../reviews';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([
      CategoryRepository,
      ColorRepository,
      ProductRepository,
      SizeValueRepository,
      WishlistRepository,
    ]),
    ReviewsModule,
    QuestionsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

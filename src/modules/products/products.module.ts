import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmCustomModule } from '@/common';
import {
  Category,
  ColorRepository,
  Product,
  SizeValueRepository,
  Wishlist,
} from '@/models';

import { QuestionsModule } from '../questions';
import { ReviewsModule } from '../reviews';

import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, Wishlist]),
    TypeOrmCustomModule.forFeature([ColorRepository, SizeValueRepository]),
    ReviewsModule,
    QuestionsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}

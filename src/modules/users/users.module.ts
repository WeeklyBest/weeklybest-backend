import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmCustomModule } from '@/common';
import { Question, Review, UserRepository, Wishlist } from '@/models';

import { ProductsModule } from '../products';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([Wishlist, Question, Review]),
    ProductsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

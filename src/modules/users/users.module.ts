import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmCustomModule } from '@/common';
import { Question, UserRepository, Wishlist } from '@/models';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmCustomModule.forFeature([UserRepository]),
    TypeOrmModule.forFeature([Wishlist, Question]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

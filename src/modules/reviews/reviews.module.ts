import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Review } from '@/models';

import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}

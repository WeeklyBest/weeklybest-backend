import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Review } from '@/models';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
})
export class ReviewsModule {}

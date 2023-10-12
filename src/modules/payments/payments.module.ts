import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order, UserRepository } from '@/models';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { TypeOrmCustomModule } from '@/common';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    TypeOrmModule.forFeature([Order]),
    TypeOrmCustomModule.forFeature([UserRepository]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: [PaymentsService],
})
export class PaymentsModule {}

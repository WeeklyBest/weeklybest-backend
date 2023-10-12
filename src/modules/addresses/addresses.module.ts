import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Address } from '@/models';

import { AddressesController } from './addresses.controller';
import { AddressesService } from './addresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Address])],
  controllers: [AddressesController],
  providers: [AddressesService],
  exports: [AddressesService],
})
export class AddressesModule {}

import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { User } from '@/models';

import { CurrentUser, JwtAuthGuard } from '../auth';

import { AddressIdParam, CreateAddressRequest } from './dtos';

import { AddressesService } from './addresses.service';
import { AddressesControllerDoc as Doc } from './controller.doc';

@ApiTags('주소 API')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressService: AddressesService) {}

  @Doc.register('주소 저장')
  @Post()
  @UseGuards(JwtAuthGuard)
  async register(@Body() dto: CreateAddressRequest, @CurrentUser() user: User) {
    await this.addressService.register(dto, user);
  }

  @Doc.remove('주소 삭제')
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param() { id }: AddressIdParam, @CurrentUser() user: User) {
    await this.addressService.remove(id, user);
  }
}

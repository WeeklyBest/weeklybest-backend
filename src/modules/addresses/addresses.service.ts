import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ADDRESS_ERROR, Address, User } from '@/models';

import { CreateAddressRequest } from './dtos';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressesRepository: Repository<Address>,
  ) {}

  async register(dto: CreateAddressRequest, user: User) {
    const newAddress = await this.addressesRepository.save(
      this.addressesRepository.create({
        ...dto,
        user,
      }),
    );

    if (!newAddress) {
      throw new HttpException(
        ADDRESS_ERROR.CREATE_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number, user: User) {
    const result = await this.addressesRepository.delete({
      id,
      user,
    });

    if (result.affected <= 0) {
      throw new HttpException(
        ADDRESS_ERROR.DELETE_ERROR,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

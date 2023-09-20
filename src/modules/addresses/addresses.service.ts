import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { ADDRESS_ERROR, Address, User } from '@/models';

import { AddressResponse, CreateAddressRequest } from './dtos';

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

  async getOne(id: number, user: User): Promise<AddressResponse> {
    const address = await this.addressesRepository.findOne({
      where: { id, user },
    });

    if (!address) {
      throw new HttpException(ADDRESS_ERROR.NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    return new AddressResponse(address);
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

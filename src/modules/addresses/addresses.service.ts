import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { ADDRESS_ERROR, Address, User } from '@/models';

import {
  AddressResponse,
  CreateAddressRequest,
  EditAddressRequest,
} from './dtos';
import { PagingQuery, useTransaction } from '@/common';

@Injectable()
export class AddressesService {
  constructor(
    private readonly dataSource: DataSource,
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

  async getMe(
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<AddressResponse[]> {
    const addresses = await this.addressesRepository.find({
      where: {
        user,
      },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
      order: {
        isDefault: 'DESC',
        createdAt: 'DESC',
      },
    });

    return addresses.map((address) => new AddressResponse(address));
  }

  async edit(id: number, dto: EditAddressRequest, user: User): Promise<void> {
    await useTransaction(this.dataSource, async (manager) => {
      const addressRepository = manager.getRepository(Address);

      if (dto.isDefault) {
        await addressRepository.update(
          {
            isDefault: true,
            user,
          },
          {
            isDefault: false,
          },
        );
      }

      const result = await addressRepository.update(
        {
          id,
          user,
        },
        dto,
      );

      if (result.affected <= 0) {
        throw new HttpException(
          ADDRESS_ERROR.UPDATE_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }
    });
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

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DataSource, Repository } from 'typeorm';

import { PagingQuery, useTransaction } from '@/common';
import { ERROR } from '@/docs';
import { Address, User } from '@/models';

import {
  AddressResponse,
  CreateAddressRequest,
  EditAddressRequest,
} from './dtos';

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
      throw new InternalServerErrorException(ERROR.ADDRESS.CREATE_ERROR);
    }
  }

  async getOne(id: number, user: User): Promise<AddressResponse> {
    const address = await this.addressesRepository.findOne({
      where: { id, user: { id: user.id } },
    });

    this.checkAddressExistence(!!address);

    return new AddressResponse(address);
  }

  async getMe(
    { pageNum, pageSize }: PagingQuery,
    user: User,
  ): Promise<AddressResponse[]> {
    const addresses = await this.addressesRepository.find({
      where: {
        user: { id: user.id },
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
            user: { id: user.id },
          },
          {
            isDefault: false,
          },
        );
      }

      const result = await addressRepository.update(
        {
          id,
          user: { id: user.id },
        },
        dto,
      );

      if (result.affected <= 0) {
        throw new InternalServerErrorException(ERROR.ADDRESS.UPDATE_ERROR);
      }
    });
  }

  async remove(id: number, user: User) {
    const result = await this.addressesRepository.delete({
      id,
      user: { id: user.id },
    });

    if (result.affected <= 0) {
      throw new InternalServerErrorException(ERROR.ADDRESS.DELETE_ERROR);
    }
  }

  private checkAddressExistence(trueCondition: boolean) {
    if (!trueCondition) {
      throw new NotFoundException(ERROR.ADDRESS.NOT_FOUND);
    }
  }
}

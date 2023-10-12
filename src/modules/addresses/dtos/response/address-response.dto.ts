import { SwaggerDoc } from '@/common';
import { Address } from '@/models';

import { AddressResponeDto } from '../decorators';

export class AddressResponse {
  @AddressResponeDto.addressId()
  id: number;

  @AddressResponeDto.label()
  label: string;

  @AddressResponeDto.recipient()
  recipient: string;

  @AddressResponeDto.recipientPhone()
  recipientPhone: string;

  @AddressResponeDto.postalCode()
  postalCode: string;

  @AddressResponeDto.address()
  address: string;

  @AddressResponeDto.addressDetail()
  addressDetail: string;

  @AddressResponeDto.isDefault()
  isDefault: boolean;

  @SwaggerDoc.createdAt()
  createdAt: Date;

  @SwaggerDoc.updatedAt()
  updatedAt: Date;

  @AddressResponeDto.usedAt()
  usedAt: Date;

  constructor(address: Address) {
    this.id = address.id;
    this.label = address.label;
    this.recipient = address.recipient;
    this.recipientPhone = address.recipientPhone;
    this.postalCode = address.postalCode;
    this.address = address.address;
    this.addressDetail = address.addressDetail;
    this.isDefault = address.isDefault;

    this.createdAt = address.createdAt;
    this.updatedAt = address.updatedAt;
    this.usedAt = address.usedAt;
  }
}

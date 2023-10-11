import { IsOptional } from 'class-validator';

import { AddressRequestDto } from '../decorators';

export class CreateAddressRequest {
  @AddressRequestDto.label()
  label: string;

  @AddressRequestDto.recipient()
  recipient: string;

  @AddressRequestDto.recipientPhone()
  recipientPhone: string;

  @AddressRequestDto.postalCode()
  postalCode: string;

  @AddressRequestDto.address()
  address: string;

  @AddressRequestDto.addressDetail()
  @IsOptional()
  addressDetail: string;

  @AddressRequestDto.isDefault()
  @IsOptional()
  isDefault: boolean;
}

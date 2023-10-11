import { IsOptional } from 'class-validator';

import { AddressRequestDto } from '../decorators';

export class EditAddressRequest {
  @AddressRequestDto.label()
  @IsOptional()
  label: string;

  @AddressRequestDto.recipient()
  @IsOptional()
  recipient: string;

  @AddressRequestDto.recipientPhone()
  @IsOptional()
  recipientPhone: string;

  @AddressRequestDto.postalCode()
  @IsOptional()
  postalCode: string;

  @AddressRequestDto.address()
  @IsOptional()
  address: string;

  @AddressRequestDto.addressDetail()
  @IsOptional()
  addressDetail: string;

  @AddressRequestDto.isDefault()
  @IsOptional()
  isDefault: boolean;

  @AddressRequestDto.usedAt()
  @IsOptional()
  usedAt: Date;
}

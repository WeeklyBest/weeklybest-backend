import { AddressDoc } from '@/docs';

export class EditAddressRequest {
  @AddressDoc.label()
  label: string;

  @AddressDoc.recipient()
  recipient: string;

  @AddressDoc.recipientPhone()
  recipientPhone: string;

  @AddressDoc.postalCode()
  postalCode: string;

  @AddressDoc.address()
  address: string;

  @AddressDoc.addressDetail()
  addressDetail: string;

  @AddressDoc.isDefault()
  isDefault: boolean;

  @AddressDoc.usedAt()
  usedAt: Date;
}
import { applyDecorators } from '@nestjs/common';

import { AddressDoc } from '@/docs';

export const AddressResponeDto = {
  addressId() {
    return applyDecorators(AddressDoc.addressId());
  },

  label() {
    return applyDecorators(AddressDoc.label());
  },

  recipient() {
    return applyDecorators(AddressDoc.recipient());
  },

  recipientPhone() {
    return applyDecorators(AddressDoc.recipientPhone());
  },

  postalCode() {
    return applyDecorators(AddressDoc.postalCode());
  },

  address() {
    return applyDecorators(AddressDoc.address());
  },

  addressDetail() {
    return applyDecorators(AddressDoc.addressDetail());
  },

  isDefault() {
    return applyDecorators(AddressDoc.isDefault());
  },

  usedAt() {
    return applyDecorators(AddressDoc.usedAt());
  },
};

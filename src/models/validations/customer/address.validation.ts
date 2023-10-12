import { applyDecorators } from '@nestjs/common';

import {
  IsBoolean,
  IsDate,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

import {
  SwaggerEntityDocType,
  getIsBooleanMessage,
  getIsDateMessage,
  getIsNumberStringMessage,
  getIsStringMessage,
  getMaxLengthMessage,
  getStringTypeMessage,
} from '@/common';

import { ADDRESS } from '@/models/constants';
import { Address } from '@/models/entities';

import { UserValidation } from './user.validation';

export const AddressValidation: SwaggerEntityDocType<Address> = {
  label() {
    const property = ADDRESS.LABEL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(ADDRESS.LABEL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: ADDRESS.LABEL.MAX_LENGTH,
        }),
      }),
    );
  },

  postalCode(propertyName?: string) {
    const property = propertyName || ADDRESS.POSTAL_CODE.KR;
    return applyDecorators(
      IsNumberString({}, { message: getIsNumberStringMessage({ property }) }),
      Length(ADDRESS.POSTAL_CODE.LENGTH, ADDRESS.POSTAL_CODE.LENGTH, {
        message: getStringTypeMessage({ property }),
      }),
    );
  },

  recipient() {
    const property = ADDRESS.RECIPIENT.KR;
    return applyDecorators(UserValidation.name(property));
  },

  recipientPhone() {
    const property = ADDRESS.RECIPIENT_PHONE.KR;
    return applyDecorators(UserValidation.phone(property));
  },

  address() {
    const property = ADDRESS.ADDRESS.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(ADDRESS.ADDRESS.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: ADDRESS.ADDRESS.MAX_LENGTH,
        }),
      }),
    );
  },

  addressDetail() {
    const property = ADDRESS.ADDRESS_DETAIL.KR;
    return applyDecorators(
      IsString({ message: getIsStringMessage({ property }) }),
      MaxLength(ADDRESS.ADDRESS_DETAIL.MAX_LENGTH, {
        message: getMaxLengthMessage({
          property,
          maxLength: ADDRESS.ADDRESS_DETAIL.MAX_LENGTH,
        }),
      }),
    );
  },

  isDefault() {
    const property = ADDRESS.IS_DEFAULT.KR;
    return applyDecorators(
      IsBoolean({ message: getIsBooleanMessage({ property }) }),
    );
  },

  usedAt() {
    const property = ADDRESS.USED_AT.KR;
    return applyDecorators(IsDate({ message: getIsDateMessage({ property }) }));
  },
};

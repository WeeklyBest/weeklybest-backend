import { AddressRequestDto } from '../decorators';

export class AddressIdParam {
  @AddressRequestDto.addressId()
  id: number;
}

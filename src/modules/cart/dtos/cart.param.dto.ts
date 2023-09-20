import { ApiProperty } from '@nestjs/swagger';

export class CartParamDto {
  @ApiProperty({
    description: '장바구니 아이템 식별자',
    example: 1,
  })
  id: number;
}

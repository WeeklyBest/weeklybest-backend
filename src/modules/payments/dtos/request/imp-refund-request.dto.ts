import { IsNotEmpty, IsOptional } from 'class-validator';

import { ImpRequestDto } from '../decorator';

export class ImpRefundRequest {
  @ImpRequestDto.impUID()
  @IsNotEmpty()
  impUID: string;

  @ImpRequestDto.reason()
  @IsOptional()
  reason?: string;

  @ImpRequestDto.amount()
  @IsOptional()
  amount?: number;

  @ImpRequestDto.checksum()
  @IsOptional()
  checksum?: number;
}

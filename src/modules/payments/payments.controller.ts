import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ImpRefundRequest } from './dtos';

import { PaymentsControllerDoc as Doc } from './controller.doc';
import { PaymentsService } from './payments.service';
import { CurrentUser, JwtAuthGuard } from '../auth';
import { User } from '@/models';

@ApiTags('IMPort 결제 API')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Doc.refund('아임포트 환불')
  @UseGuards(JwtAuthGuard)
  @Post('refund')
  async refund(
    @Body() dto: ImpRefundRequest,
    @CurrentUser() user: User,
  ): Promise<void> {
    return this.paymentsService.refund(dto, user);
  }
}

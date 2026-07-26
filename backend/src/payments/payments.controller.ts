import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentMethod } from './payment-method.entity';

@Controller('api/payment-methods')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() cardData: Partial<PaymentMethod>): Promise<PaymentMethod> {
    return await this.paymentsService.create(cardData);
  }

  @Get()
  async findAll(@Query('userId') userId?: string): Promise<PaymentMethod[]> {
    return await this.paymentsService.findAll(userId);
  }

  @Patch(':id/default')
  async setDefault(
    @Param('id') id: string,
    @Body('userId') userId?: string,
  ): Promise<PaymentMethod> {
    return await this.paymentsService.setDefault(id, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return await this.paymentsService.remove(id);
  }
}

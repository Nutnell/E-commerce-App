import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentMethod } from './payment-method.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Security Fix #4: All payment endpoints now require authentication
@Controller('api/payment-methods')
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() cardData: Partial<PaymentMethod>, @Req() req: any): Promise<PaymentMethod> {
    // Security Fix #5: Force userId from authenticated token
    return await this.paymentsService.create({ ...cardData, userId: req.user.id });
  }

  @Get()
  async findAll(@Req() req: any): Promise<PaymentMethod[]> {
    // Security Fix #5: Users can only see their own payment methods
    return await this.paymentsService.findAll(req.user.id);
  }

  @Patch(':id/default')
  async setDefault(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<PaymentMethod> {
    // Security Fix #5: Only set default on own cards
    return await this.paymentsService.setDefault(id, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any): Promise<{ success: boolean }> {
    // Security Fix #5: Only delete own cards
    return await this.paymentsService.remove(id, req.user.id);
  }
}

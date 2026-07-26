import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';

@Controller('api/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() orderData: Partial<Order>): Promise<Order> {
    return await this.ordersService.create(orderData);
  }

  @Get()
  async findAll(@Query('userId') userId?: string): Promise<Order[]> {
    return await this.ordersService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Order> {
    return await this.ordersService.findOne(id);
  }

  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Order> {
    return await this.ordersService.updateStatus(id, status);
  }
}

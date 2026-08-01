import { Controller, Get, Post, Body, Param, Patch, Query, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

// Security Fix #4: All order endpoints now require authentication
@Controller('api/orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() orderData: Partial<Order>, @Req() req: any): Promise<Order> {
    // Security Fix #5: Force userId from authenticated token, not from client body
    return await this.ordersService.create({ ...orderData, userId: req.user.id });
  }

  @Get()
  async findAll(@Req() req: any): Promise<Order[]> {
    // Security Fix #5: Users can only see their own orders
    return await this.ordersService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any): Promise<Order> {
    // Security Fix #5: Verify ownership before returning order details
    const order = await this.ordersService.findOne(id);
    if (order.userId !== req.user.id && req.user.role !== 'admin') {
      throw new ForbiddenException('You do not have access to this order');
    }
    return order;
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Order> {
    // Security Fix #4: Only admins can change order status
    return await this.ordersService.updateStatus(id, status);
  }
}

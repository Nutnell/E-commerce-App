import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Product } from '../products/product.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@Controller('api/admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics')
  async getAnalytics() {
    return await this.adminService.getAnalytics();
  }

  @Post('products')
  async createProduct(@Body() productData: Partial<Product>): Promise<Product> {
    return await this.adminService.createProduct(productData);
  }

  @Put('products/:id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() productData: Partial<Product>,
  ): Promise<Product> {
    return await this.adminService.updateProduct(id, productData);
  }

  @Delete('products/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<{ success: boolean }> {
    return await this.adminService.deleteProduct(id);
  }
}

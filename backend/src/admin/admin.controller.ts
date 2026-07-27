import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Product } from '../products/product.entity';

@Controller('api/admin')
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

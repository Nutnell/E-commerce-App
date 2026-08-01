import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { Review } from './review.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(@Query('search') search?: string): Promise<Product[]> {
    return this.productsService.getAllProducts(search);
  }

  @Get('new')
  async getNew(): Promise<Product[]> {
    return this.productsService.getNewProducts();
  }

  @Get('sale')
  async getSale(): Promise<Product[]> {
    return this.productsService.getSaleProducts();
  }

  @Post('reseed')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async reseed(): Promise<{ message: string }> {
    await this.productsService.reseedDatabase();
    return { message: 'Catalog re-seeded successfully' };
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product | null> {
    return this.productsService.getProductById(Number(id));
  }

  @Get(':id/reviews')
  async getReviews(@Param('id') id: string): Promise<Review[]> {
    return this.productsService.getReviewsByProductId(Number(id));
  }

  @Post(':id/reviews')
  async createReview(
    @Param('id') id: string,
    @Body() body: { userName: string; rating: number; comment: string; photos?: string },
  ): Promise<Review> {
    return this.productsService.createReview(Number(id), body);
  }
}

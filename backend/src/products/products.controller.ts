import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productsService.getAllProducts();
  }

  @Get('new')
  async getNew(): Promise<Product[]> {
    return this.productsService.getNewProducts();
  }

  @Get('sale')
  async getSale(): Promise<Product[]> {
    return this.productsService.getSaleProducts();
  }
}

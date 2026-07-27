import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { Order } from '../orders/order.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async getAnalytics() {
    const productsCount = await this.productRepository.count();
    const ordersCount = await this.orderRepository.count();
    const orders = await this.orderRepository.find();
    
    const totalRevenue = orders.reduce((sum, ord) => sum + Number(ord.totalAmount || 0), 0);
    const lowStockCount = await this.productRepository.count({ where: { ratingCount: 5 } }); // Sample indicator

    return {
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      totalOrders: ordersCount,
      totalProducts: productsCount,
      lowStockItems: 3,
    };
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const newProd = this.productRepository.create({
      ...productData,
      rating: productData.rating || 4.5,
      ratingCount: productData.ratingCount || 1,
      imageUrl: productData.imageUrl || '/assets/cat_cardigans.png',
      sizes: productData.sizes || 'S,M,L',
      colors: productData.colors || 'black,white',
    });
    return await this.productRepository.save(newProd);
  }

  async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    Object.assign(product, productData);
    return await this.productRepository.save(product);
  }

  async deleteProduct(id: number): Promise<{ success: boolean }> {
    const res = await this.productRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return { success: true };
  }
}

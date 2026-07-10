import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  private async seedProducts() {
    const count = await this.productRepository.count();
    if (count > 0) {
      return; // Already seeded
    }

    const mockProducts: Partial<Product>[] = [
      {
        name: 'Evening Dress',
        brand: 'Dorothy Perkins',
        price: 12.0,
        originalPrice: 15.0,
        discountPercent: 20,
        rating: 5.0,
        ratingCount: 10,
        imageUrl: '/assets/evening_dress_product.png',
        isNew: false,
        isSale: true,
        category: 'dresses',
      },
      {
        name: 'Sport Dress',
        brand: 'Sitlly',
        price: 19.0,
        originalPrice: 22.0,
        discountPercent: 15,
        rating: 5.0,
        ratingCount: 10,
        imageUrl: '/assets/sport_dress_product.png',
        isNew: false,
        isSale: true,
        category: 'dresses',
      },
      {
        name: 'Striped Top',
        brand: 'Dorothy Perkins',
        price: 15.0,
        rating: 4.5,
        ratingCount: 5,
        imageUrl: '/assets/new_product_1.png',
        isNew: true,
        isSale: false,
        category: 'tops',
      },
      {
        name: 'White T-Shirt',
        brand: 'Sitlly',
        price: 12.0,
        rating: 4.0,
        ratingCount: 3,
        imageUrl: '/assets/new_product_2.png',
        isNew: true,
        isSale: false,
        category: 'tops',
      },
    ];

    await this.productRepository.save(mockProducts);
    console.log('Successfully seeded database with 4 initial products.');
  }

  async getNewProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { isNew: true } });
  }

  async getSaleProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { isSale: true } });
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.find();
  }
}

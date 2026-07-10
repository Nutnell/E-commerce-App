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
      // ---- Sale / Summer Sale Products ----
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
        name: 'Denim Jacket',
        brand: 'Mango',
        price: 29.0,
        originalPrice: 45.0,
        discountPercent: 35,
        rating: 4.5,
        ratingCount: 18,
        imageUrl: '/assets/product_denim_jacket.png',
        isNew: false,
        isSale: true,
        category: 'jackets',
      },
      {
        name: 'Wrap Dress',
        brand: 'H&M',
        price: 24.0,
        originalPrice: 38.0,
        discountPercent: 37,
        rating: 4.0,
        ratingCount: 22,
        imageUrl: '/assets/product_wrap_dress.png',
        isNew: false,
        isSale: true,
        category: 'dresses',
      },
      {
        name: 'Leather Bag',
        brand: 'Zara',
        price: 35.0,
        originalPrice: 55.0,
        discountPercent: 36,
        rating: 4.5,
        ratingCount: 31,
        imageUrl: '/assets/product_leather_bag.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
      },
      {
        name: 'Platform Sneakers',
        brand: 'Nike',
        price: 59.0,
        originalPrice: 89.0,
        discountPercent: 34,
        rating: 5.0,
        ratingCount: 45,
        imageUrl: '/assets/product_sneakers.png',
        isNew: false,
        isSale: true,
        category: 'shoes',
      },
      // ---- New / Trending Products ----
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
      {
        name: 'Summer Blouse',
        brand: 'Zara',
        price: 22.0,
        rating: 4.5,
        ratingCount: 14,
        imageUrl: '/assets/product_summer_blouse.png',
        isNew: true,
        isSale: false,
        category: 'tops',
      },
      {
        name: 'Maxi Skirt',
        brand: 'Mango',
        price: 28.0,
        rating: 4.0,
        ratingCount: 8,
        imageUrl: '/assets/product_maxi_skirt.png',
        isNew: true,
        isSale: false,
        category: 'skirts',
      },
      {
        name: 'Linen Pants',
        brand: 'H&M',
        price: 32.0,
        rating: 4.5,
        ratingCount: 19,
        imageUrl: '/assets/product_linen_pants.png',
        isNew: true,
        isSale: false,
        category: 'pants',
      },
      {
        name: 'Knit Sweater',
        brand: 'Dorothy Perkins',
        price: 26.0,
        rating: 5.0,
        ratingCount: 12,
        imageUrl: '/assets/product_knit_sweater.png',
        isNew: true,
        isSale: false,
        category: 'sweaters',
      },
    ];

    await this.productRepository.save(mockProducts);
    console.log('Successfully seeded database with 12 initial products.');
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

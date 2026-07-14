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
    // Clear database if the seeded data is legacy and lacks color details
    const existingCount = await this.productRepository.count();
    if (existingCount > 0) {
      const sample = await this.productRepository.findOne({ where: {} });
      if (sample && !sample.colors) {
        console.log('Legacy database detected (no color data). Clearing products for re-seeding...');
        await this.productRepository.clear();
      } else {
        return; // Already seeded with colors
      }
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
        colors: 'black,red,white',
        sizes: 'S,M,L',
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
        colors: 'black,blue',
        sizes: 'XS,S,M',
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
        colors: 'blue,grey,black',
        sizes: 'M,L,XL',
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
        colors: 'red,white,tan',
        sizes: 'S,M,L,XL',
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
        colors: 'black,tan,grey',
        sizes: 'M',
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
        colors: 'white,black,blue',
        sizes: 'S,M,L',
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
        colors: 'black,white,red',
        sizes: 'XS,S,M,L',
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
        colors: 'white,grey',
        sizes: 'S,M,L',
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
        colors: 'white,tan,red',
        sizes: 'XS,S,M',
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
        colors: 'black,tan,blue',
        sizes: 'S,M,L',
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
        colors: 'tan,white,grey',
        sizes: 'M,L,XL',
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
        colors: 'grey,black,red',
        sizes: 'S,M,L,XL',
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

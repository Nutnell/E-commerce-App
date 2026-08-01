import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Review } from './review.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async onModuleInit() {
    await this.seedProducts();
  }

  async reseedDatabase() {
    await this.seedProducts();
  }

  private async seedProducts() {
    console.log('Clearing products and reviews database for re-seeding catalog...');
    await this.reviewRepository.clear();
    await this.productRepository.clear();

    const mockProducts: Partial<Product>[] = [
      // ================================================================
      //  1. WOMEN'S PRODUCTS (gender: 'women')
      // ================================================================

      // ---- Women's Clothes: Dresses ----
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
        category: 'clothes',
        subcategory: 'dresses',
        gender: 'women',
        colors: 'pink,black,red,white,blue',
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
        category: 'clothes',
        subcategory: 'dresses',
        gender: 'women',
        colors: 'grey,black,blue,red,white',
        sizes: 'XS,S,M',
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
        category: 'clothes',
        subcategory: 'dresses',
        gender: 'women',
        colors: 'blue,red,white,tan',
        sizes: 'S,M,L,XL',
      },

      // ---- Women's Clothes: Tops & Blouses ----
      {
        name: 'Striped Top',
        brand: 'Dorothy Perkins',
        price: 15.0,
        rating: 4.5,
        ratingCount: 5,
        imageUrl: '/assets/new_product_1.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'tops',
        gender: 'women',
        colors: 'red,black,white,blue',
        sizes: 'XS,S,M,L',
      },
      {
        name: 'Plain T-Shirt',
        brand: 'Sitlly',
        price: 12.0,
        rating: 4.0,
        ratingCount: 3,
        imageUrl: '/assets/new_product_2.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'tops',
        gender: 'women',
        colors: 'white,red,blue,grey',
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
        category: 'clothes',
        subcategory: 'blouses',
        gender: 'women',
        colors: 'white,tan,red',
        sizes: 'XS,S,M',
      },

      // ---- Women's Clothes: Skirts ----
      {
        name: 'Maxi Skirt',
        brand: 'Mango',
        price: 28.0,
        rating: 4.0,
        ratingCount: 8,
        imageUrl: '/assets/product_maxi_skirt.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'skirts',
        gender: 'women',
        colors: 'pink,black,tan,blue,white',
        sizes: 'S,M,L',
      },
      {
        name: 'Pleated Mini Skirt',
        brand: 'Zara',
        price: 18.0,
        rating: 4.3,
        ratingCount: 11,
        imageUrl: '/assets/cat_partywear.png',
        isNew: false,
        isSale: false,
        category: 'clothes',
        subcategory: 'skirts',
        gender: 'women',
        colors: 'silver,black,red,white,tan,gold',
        sizes: 'XS,S,M',
      },

      // ---- Women's Clothes: Pants ----
      {
        name: 'Linen Pants',
        brand: 'H&M',
        price: 32.0,
        rating: 4.5,
        ratingCount: 19,
        imageUrl: '/assets/product_linen_pants.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'pants',
        gender: 'women',
        colors: 'tan,white,grey',
        sizes: 'M,L,XL',
      },
      {
        name: 'Wide Leg Trousers',
        brand: 'Mango',
        price: 36.0,
        rating: 4.4,
        ratingCount: 13,
        imageUrl: '/assets/cat_officestyle.png',
        isNew: false,
        isSale: false,
        category: 'clothes',
        subcategory: 'pants',
        gender: 'women',
        colors: 'black,tan',
        sizes: 'S,M,L,XL',
      },

      // ---- Women's Clothes: Jeans ----
      {
        name: 'Skinny Fit Jeans',
        brand: 'Zara',
        price: 34.0,
        originalPrice: 45.0,
        discountPercent: 24,
        rating: 4.2,
        ratingCount: 9,
        imageUrl: '/assets/cat_jeanswear.png',
        isNew: false,
        isSale: true,
        category: 'clothes',
        subcategory: 'jeans',
        gender: 'women',
        colors: 'blue,black,grey',
        sizes: 'S,M,L,XL',
      },
      {
        name: 'Mom Fit Jeans',
        brand: 'Dorothy Perkins',
        price: 38.0,
        rating: 4.6,
        ratingCount: 17,
        imageUrl: '/assets/cat_jeanswear.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'jeans',
        gender: 'women',
        colors: 'blue,grey',
        sizes: 'S,M,L',
      },

      // ---- Women's Clothes: Sweaters & Cardigans ----
      {
        name: 'Knit Sweater',
        brand: 'Dorothy Perkins',
        price: 26.0,
        rating: 5.0,
        ratingCount: 12,
        imageUrl: '/assets/product_knit_sweater.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'sweaters',
        gender: 'women',
        colors: 'white,grey,black,red,blue',
        sizes: 'S,M,L,XL',
      },
      {
        name: 'Cashmere Cardigan',
        brand: 'H&M',
        price: 42.0,
        rating: 4.7,
        ratingCount: 9,
        imageUrl: '/assets/cat_cardigans.png',
        isNew: false,
        isSale: false,
        category: 'clothes',
        subcategory: 'sweaters',
        gender: 'women',
        colors: 'tan,grey,white',
        sizes: 'S,M,L',
      },

      // ---- Women's Clothes: Outerwear ----
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
        category: 'clothes',
        subcategory: 'outerwear',
        gender: 'women',
        colors: 'blue,grey,black',
        sizes: 'M,L,XL',
      },
      {
        name: 'Trench Coat',
        brand: 'Zara',
        price: 65.0,
        rating: 4.8,
        ratingCount: 20,
        imageUrl: '/assets/cat_outerwear.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'outerwear',
        gender: 'women',
        colors: 'tan,black',
        sizes: 'S,M,L',
      },

      // ---- Women's Clothes: Shorts ----
      {
        name: 'Denim Shorts',
        brand: 'H&M',
        price: 16.0,
        rating: 4.1,
        ratingCount: 7,
        imageUrl: '/assets/women_denim_shorts.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'shorts',
        gender: 'women',
        colors: 'blue,white',
        sizes: 'XS,S,M',
      },
      {
        name: 'Linen Shorts',
        brand: 'Mango',
        price: 20.0,
        rating: 4.3,
        ratingCount: 5,
        imageUrl: '/assets/cat_beachwear.png',
        isNew: false,
        isSale: false,
        category: 'clothes',
        subcategory: 'shorts',
        gender: 'women',
        colors: 'tan,white',
        sizes: 'S,M,L',
      },

      // ---- Women's Shoes: Sneakers ----
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
        subcategory: 'sneakers',
        gender: 'women',
        colors: 'white,black,blue',
        sizes: 'S,M,L',
      },

      // ---- Women's Shoes: Sandals ----
      {
        name: 'Casual Sandals',
        brand: 'Zara',
        price: 24.0,
        originalPrice: 32.0,
        discountPercent: 25,
        rating: 4.4,
        ratingCount: 11,
        imageUrl: '/assets/women_casual_sandals.png',
        isNew: false,
        isSale: true,
        category: 'shoes',
        subcategory: 'sandals',
        gender: 'women',
        colors: 'tan,white',
        sizes: 'S,M,L',
      },

      // ---- Women's Shoes: Heels ----
      {
        name: 'Red Stiletto Heels',
        brand: 'Dorothy Perkins',
        price: 45.0,
        originalPrice: 55.0,
        discountPercent: 18,
        rating: 4.8,
        ratingCount: 15,
        imageUrl: '/assets/women_red_stiletto_heels.png',
        isNew: true,
        isSale: true,
        category: 'shoes',
        subcategory: 'heels',
        gender: 'women',
        colors: 'red,black',
        sizes: 'S,M,L',
      },
      {
        name: 'Block Heel Pumps',
        brand: 'Mango',
        price: 38.0,
        rating: 4.5,
        ratingCount: 12,
        imageUrl: '/assets/women_block_heel_pumps.png',
        isNew: true,
        isSale: false,
        category: 'shoes',
        subcategory: 'heels',
        gender: 'women',
        colors: 'black,tan',
        sizes: 'S,M,L',
      },

      // ---- Women's Shoes: Boots ----
      {
        name: 'Warm Leather Boots',
        brand: 'Mango',
        price: 89.0,
        rating: 4.7,
        ratingCount: 20,
        imageUrl: '/assets/women_warm_leather_boots.png',
        isNew: true,
        isSale: false,
        category: 'shoes',
        subcategory: 'boots',
        gender: 'women',
        colors: 'black,tan',
        sizes: 'M,L',
      },

      // ---- Women's Shoes: Flats ----
      {
        name: 'Ballet Flats',
        brand: 'H&M',
        price: 22.0,
        rating: 4.3,
        ratingCount: 14,
        imageUrl: '/assets/women_ballet_flats.png',
        isNew: true,
        isSale: false,
        category: 'shoes',
        subcategory: 'flats',
        gender: 'women',
        colors: 'black,tan,red',
        sizes: 'S,M,L',
      },

      // ---- Women's Accessories: Bags ----
      {
        name: 'Leather Handbag',
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
        subcategory: 'bags',
        gender: 'women',
        colors: 'black,tan,grey',
        sizes: 'M',
      },

      // ---- Women's Accessories: Hats ----
      {
        name: 'Straw Sun Hat',
        brand: 'H&M',
        price: 15.0,
        originalPrice: 20.0,
        discountPercent: 25,
        rating: 4.3,
        ratingCount: 6,
        imageUrl: '/assets/women_straw_sun_hat.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
        subcategory: 'hats',
        gender: 'women',
        colors: 'tan,white',
        sizes: 'M',
      },

      // ---- Women's Accessories: Sunglasses ----
      {
        name: 'Retro Sunglasses',
        brand: 'Mango',
        price: 29.0,
        originalPrice: 39.0,
        discountPercent: 25,
        rating: 4.6,
        ratingCount: 14,
        imageUrl: '/assets/women_retro_sunglasses.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
        subcategory: 'sunglasses',
        gender: 'women',
        colors: 'black,brown',
        sizes: 'M',
      },

      // ---- Women's Accessories: Scarves ----
      {
        name: 'Silk Scarf',
        brand: 'Dorothy Perkins',
        price: 18.0,
        rating: 4.5,
        ratingCount: 7,
        imageUrl: '/assets/women_silk_scarf.png',
        isNew: true,
        isSale: false,
        category: 'accessories',
        subcategory: 'scarves',
        gender: 'women',
        colors: 'red,tan,black',
        sizes: 'M',
      },

      // ---- Women's Accessories: Jewelry ----
      {
        name: 'Gold Pendant Necklace',
        brand: 'Mango',
        price: 14.0,
        rating: 4.7,
        ratingCount: 18,
        imageUrl: '/assets/women_gold_pendant_necklace.png',
        isNew: true,
        isSale: false,
        category: 'accessories',
        subcategory: 'jewelry',
        gender: 'women',
        colors: 'gold',
        sizes: 'M',
      },


      // ================================================================
      //  2. MEN'S PRODUCTS (gender: 'men')
      // ================================================================

      // ---- Men's Clothes: Shirts ----
      {
        name: 'Casual Check Shirt',
        brand: 'Jack & Jones',
        price: 24.0,
        rating: 4.5,
        ratingCount: 16,
        imageUrl: '/assets/mens_check_shirt.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'shirts',
        gender: 'men',
        colors: 'blue,white',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: T-Shirts ----
      {
        name: 'Basic Crew Tee',
        brand: 'adidas Originals',
        price: 15.0,
        rating: 4.6,
        ratingCount: 30,
        imageUrl: '/assets/mens_tshirt_plain.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'tshirts',
        gender: 'men',
        colors: 'white,black,grey',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Polo ----
      {
        name: 'Classic Polo Shirt',
        brand: 'Tommy Hilfiger',
        price: 35.0,
        rating: 4.8,
        ratingCount: 24,
        imageUrl: '/assets/mens_polo_shirt.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'polo',
        gender: 'men',
        colors: 'blue,white,red',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Hoodies ----
      {
        name: 'Premium Red Hoodie',
        brand: 'adidas Originals',
        price: 39.0,
        originalPrice: 49.0,
        discountPercent: 20,
        rating: 4.9,
        ratingCount: 22,
        imageUrl: '/assets/mens_hoodies_banner.png',
        isNew: false,
        isSale: true,
        category: 'clothes',
        subcategory: 'hoodies',
        gender: 'men',
        colors: 'red,black,grey',
        sizes: 'M,L,XL',
      },
      {
        name: 'Grey Zip Hoodie',
        brand: 'Nike',
        price: 44.0,
        rating: 4.7,
        ratingCount: 19,
        imageUrl: '/assets/mens_hoodie_grey.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'hoodies',
        gender: 'men',
        colors: 'grey,black',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Jackets & Blazers ----
      {
        name: 'Bomber Jacket',
        brand: 'Jack & Jones',
        price: 55.0,
        originalPrice: 72.0,
        discountPercent: 24,
        rating: 4.7,
        ratingCount: 28,
        imageUrl: '/assets/mens_bomber_jacket.png',
        isNew: false,
        isSale: true,
        category: 'clothes',
        subcategory: 'jackets',
        gender: 'men',
        colors: 'green,black,blue',
        sizes: 'M,L,XL',
      },
      {
        name: 'Casual Blazer',
        brand: 'Tommy Hilfiger',
        price: 85.0,
        rating: 4.8,
        ratingCount: 15,
        imageUrl: '/assets/mens_blazer.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'jackets',
        gender: 'men',
        colors: 'blue,black,grey',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Pants & Chinos ----
      {
        name: 'Classic Cargo Pants',
        brand: 's.Oliver',
        price: 35.0,
        rating: 4.2,
        ratingCount: 8,
        imageUrl: '/assets/mens_cargo_pants.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'pants',
        gender: 'men',
        colors: 'black,grey',
        sizes: 'M,L,XL',
      },
      {
        name: 'Slim Fit Chinos',
        brand: 'Tommy Hilfiger',
        price: 38.0,
        rating: 4.5,
        ratingCount: 16,
        imageUrl: '/assets/mens_chinos.png',
        isNew: false,
        isSale: false,
        category: 'clothes',
        subcategory: 'pants',
        gender: 'men',
        colors: 'tan,black,blue',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Jeans ----
      {
        name: 'Slim Fit Denim Jeans',
        brand: 'Jack & Jones',
        price: 45.0,
        rating: 4.4,
        ratingCount: 19,
        imageUrl: '/assets/mens_slim_jeans.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'jeans',
        gender: 'men',
        colors: 'blue,black',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Shorts ----
      {
        name: 'Chino Shorts',
        brand: 'Tommy Hilfiger',
        price: 22.0,
        rating: 4.5,
        ratingCount: 14,
        imageUrl: '/assets/mens_shorts_chino.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'shorts',
        gender: 'men',
        colors: 'blue,tan,black',
        sizes: 'M,L,XL',
      },

      // ---- Men's Clothes: Joggers ----
      {
        name: 'Cotton Joggers',
        brand: 'Nike',
        price: 32.0,
        rating: 4.6,
        ratingCount: 20,
        imageUrl: '/assets/mens_joggers.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'joggers',
        gender: 'men',
        colors: 'grey,black',
        sizes: 'M,L,XL',
      },

      // ---- Men's Shoes: Boots ----
      {
        name: 'Chelsea Leather Boots',
        brand: 'Tommy Hilfiger',
        price: 79.0,
        originalPrice: 99.0,
        discountPercent: 20,
        rating: 4.8,
        ratingCount: 18,
        imageUrl: '/assets/mens_leather_boots.png',
        isNew: false,
        isSale: true,
        category: 'shoes',
        subcategory: 'boots',
        gender: 'men',
        colors: 'brown,black',
        sizes: 'M,L,XL',
      },

      // ---- Men's Shoes: Loafers ----
      {
        name: 'Suede Loafers',
        brand: 'Tommy Hilfiger',
        price: 52.0,
        rating: 4.6,
        ratingCount: 14,
        imageUrl: '/assets/mens_loafers.png',
        isNew: true,
        isSale: false,
        category: 'shoes',
        subcategory: 'loafers',
        gender: 'men',
        colors: 'tan,black',
        sizes: 'M,L,XL',
      },

      // ---- Men's Shoes: Running ----
      {
        name: 'Performance Running Shoes',
        brand: 'Nike',
        price: 65.0,
        originalPrice: 85.0,
        discountPercent: 24,
        rating: 4.9,
        ratingCount: 35,
        imageUrl: '/assets/mens_running_shoes.png',
        isNew: false,
        isSale: true,
        category: 'shoes',
        subcategory: 'running',
        gender: 'men',
        colors: 'black,blue,white',
        sizes: 'M,L,XL',
      },

      // ---- Men's Accessories: Watches ----
      {
        name: 'Classic Silver Watch',
        brand: 'Tommy Hilfiger',
        price: 89.0,
        originalPrice: 120.0,
        discountPercent: 26,
        rating: 4.9,
        ratingCount: 42,
        imageUrl: '/assets/mens_watch.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
        subcategory: 'watches',
        gender: 'men',
        colors: 'silver,black',
        sizes: 'M',
      },

      // ---- Men's Accessories: Wallets ----
      {
        name: 'Leather Bifold Wallet',
        brand: 'Tommy Hilfiger',
        price: 32.0,
        rating: 4.7,
        ratingCount: 26,
        imageUrl: '/assets/mens_wallet.png',
        isNew: true,
        isSale: false,
        category: 'accessories',
        subcategory: 'wallets',
        gender: 'men',
        colors: 'brown,black',
        sizes: 'M',
      },

      // ---- Men's Accessories: Backpacks ----
      {
        name: 'Canvas Backpack',
        brand: 'Nike',
        price: 42.0,
        rating: 4.6,
        ratingCount: 20,
        imageUrl: '/assets/mens_backpack.png',
        isNew: true,
        isSale: false,
        category: 'accessories',
        subcategory: 'backpacks',
        gender: 'men',
        colors: 'blue,black,grey',
        sizes: 'M',
      },

      // ---- Men's Accessories: Belts ----
      {
        name: 'Casual Leather Belt',
        brand: 's.Oliver',
        price: 19.0,
        rating: 4.5,
        ratingCount: 12,
        imageUrl: '/assets/mens_casual_leather_belt.png',
        isNew: true,
        isSale: false,
        category: 'accessories',
        subcategory: 'belts',
        gender: 'men',
        colors: 'black,tan',
        sizes: 'M,L',
      },

      // ---- Men's Accessories: Sunglasses ----
      {
        name: 'Aviator Sunglasses',
        brand: 'Tommy Hilfiger',
        price: 35.0,
        originalPrice: 45.0,
        discountPercent: 22,
        rating: 4.7,
        ratingCount: 16,
        imageUrl: '/assets/mens_aviator_sunglasses.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
        subcategory: 'sunglasses',
        gender: 'men',
        colors: 'gold,black',
        sizes: 'M',
      },

      // ---- Men's Accessories: Hats ----
      {
        name: 'Classic Sport Cap',
        brand: 'adidas Originals',
        price: 12.0,
        originalPrice: 16.0,
        discountPercent: 25,
        rating: 4.3,
        ratingCount: 8,
        imageUrl: '/assets/mens_sport_cap.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
        subcategory: 'hats',
        gender: 'men',
        colors: 'black,blue',
        sizes: 'M',
      },


      // ================================================================
      //  3. KIDS' PRODUCTS (gender: 'kids')
      // ================================================================

      // ---- Kids Clothes: Tops ----
      {
        name: 'Kids Fun Graphic Tee',
        brand: 'H&M',
        price: 9.0,
        rating: 4.5,
        ratingCount: 6,
        imageUrl: '/assets/kids_graphic_tee.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'tops',
        gender: 'kids',
        colors: 'red,blue,white',
        sizes: 'XS,S',
      },
      {
        name: 'Kids Striped Tee',
        brand: 'H&M',
        price: 11.0,
        rating: 4.6,
        ratingCount: 8,
        imageUrl: '/assets/kids_striped_tee.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'tops',
        gender: 'kids',
        colors: 'blue,white',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Dresses ----
      {
        name: 'Girls Floral Dress',
        brand: 'H&M',
        price: 15.0,
        originalPrice: 20.0,
        discountPercent: 25,
        rating: 4.7,
        ratingCount: 10,
        imageUrl: '/assets/girls_floral_dress.png',
        isNew: false,
        isSale: true,
        category: 'clothes',
        subcategory: 'dresses',
        gender: 'kids',
        colors: 'pink,white,blue',
        sizes: 'XS,S',
      },
      {
        name: 'Girls Party Dress',
        brand: 'Zara',
        price: 24.0,
        rating: 4.8,
        ratingCount: 12,
        imageUrl: '/assets/girls_party_dress.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'dresses',
        gender: 'kids',
        colors: 'red,pink',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Skirts ----
      {
        name: 'Girls Tutu Skirt',
        brand: 'H&M',
        price: 12.0,
        rating: 4.6,
        ratingCount: 7,
        imageUrl: '/assets/girls_tutu_skirt.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'skirts',
        gender: 'kids',
        colors: 'pink,white',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Jeans ----
      {
        name: 'Kids Cargo Jeans',
        brand: 'Mango',
        price: 22.0,
        rating: 4.1,
        ratingCount: 4,
        imageUrl: '/assets/kids_cargo_jeans.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'jeans',
        gender: 'kids',
        colors: 'blue',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Shorts ----
      {
        name: 'Kids Cargo Shorts',
        brand: 'H&M',
        price: 10.0,
        originalPrice: 15.0,
        discountPercent: 33,
        rating: 4.4,
        ratingCount: 5,
        imageUrl: '/assets/kids_cargo_shorts.png',
        isNew: false,
        isSale: true,
        category: 'clothes',
        subcategory: 'shorts',
        gender: 'kids',
        colors: 'tan,blue,grey',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Hoodies ----
      {
        name: 'Kids Pullover Hoodie',
        brand: 'Nike',
        price: 25.0,
        rating: 4.8,
        ratingCount: 12,
        imageUrl: '/assets/kids_pullover_hoodie.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'hoodies',
        gender: 'kids',
        colors: 'grey,blue,red',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Jackets ----
      {
        name: 'Kids Light Jacket',
        brand: 'H&M',
        price: 28.0,
        rating: 4.5,
        ratingCount: 7,
        imageUrl: '/assets/kids_light_jacket.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'jackets',
        gender: 'kids',
        colors: 'blue,green',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Pants ----
      {
        name: 'Kids Cargo Pants',
        brand: 'Mango',
        price: 18.0,
        rating: 4.3,
        ratingCount: 5,
        imageUrl: '/assets/kids_cargo_pants.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'pants',
        gender: 'kids',
        colors: 'grey,tan',
        sizes: 'XS,S',
      },

      // ---- Kids Clothes: Sweaters ----
      {
        name: 'Kids Knit Sweater',
        brand: 'H&M',
        price: 20.0,
        rating: 4.5,
        ratingCount: 6,
        imageUrl: '/assets/kids_knit_sweater.png',
        isNew: true,
        isSale: false,
        category: 'clothes',
        subcategory: 'sweaters',
        gender: 'kids',
        colors: 'red,blue,grey',
        sizes: 'XS,S',
      },

      // ---- Kids Shoes: Sneakers ----
      {
        name: 'Kids Running Sneakers',
        brand: 'Nike',
        price: 29.0,
        rating: 4.9,
        ratingCount: 15,
        imageUrl: '/assets/kids_running_sneakers.png',
        isNew: true,
        isSale: false,
        category: 'shoes',
        subcategory: 'sneakers',
        gender: 'kids',
        colors: 'white,red,blue',
        sizes: 'XS,S',
      },

      // ---- Kids Shoes: Sandals ----
      {
        name: 'Kids Summer Sandals',
        brand: 'H&M',
        price: 14.0,
        originalPrice: 18.0,
        discountPercent: 22,
        rating: 4.4,
        ratingCount: 7,
        imageUrl: '/assets/kids_summer_sandals.png',
        isNew: false,
        isSale: true,
        category: 'shoes',
        subcategory: 'sandals',
        gender: 'kids',
        colors: 'blue,red,white',
        sizes: 'XS,S',
      },

      // ---- Kids Shoes: Boots ----
      {
        name: 'Kids Rain Boots',
        brand: 'H&M',
        price: 20.0,
        rating: 4.7,
        ratingCount: 9,
        imageUrl: '/assets/kids_rain_boots.png',
        isNew: true,
        isSale: false,
        category: 'shoes',
        subcategory: 'boots',
        gender: 'kids',
        colors: 'yellow,blue,red',
        sizes: 'XS,S',
      },

      // ---- Kids Accessories: Backpacks ----
      {
        name: 'Kids School Backpack',
        brand: 'Nike',
        price: 22.0,
        rating: 4.8,
        ratingCount: 14,
        imageUrl: '/assets/kids_school_backpack.png',
        isNew: true,
        isSale: false,
        category: 'accessories',
        subcategory: 'backpacks',
        gender: 'kids',
        colors: 'blue,red,black',
        sizes: 'S',
      },

      // ---- Kids Accessories: Hats ----
      {
        name: 'Kids Baseball Cap',
        brand: 'Nike',
        price: 8.0,
        originalPrice: 12.0,
        discountPercent: 33,
        rating: 4.4,
        ratingCount: 6,
        imageUrl: '/assets/kids_baseball_cap.png',
        isNew: false,
        isSale: true,
        category: 'accessories',
        subcategory: 'hats',
        gender: 'kids',
        colors: 'red,blue,black',
        sizes: 'S',
      },

      // ==========================================
      // CATEGORY & SPECIAL COLLECTION PRODUCTS
      // ==========================================
      { name: 'Summer Fedora Sun Hat', brand: 'H&M', price: 18.0, originalPrice: 24.0, discountPercent: 25, rating: 4.6, ratingCount: 15, imageUrl: '/assets/cat_accessories_hats.png', isNew: false, isSale: true, category: 'accessories', subcategory: 'hats', gender: 'women', colors: 'tan,white', sizes: 'M' },
      { name: 'Seamless Activewear Set', brand: 'Nike', price: 42.0, rating: 4.8, ratingCount: 29, imageUrl: '/assets/cat_activewear.png', isNew: true, isSale: false, category: 'activewear', subcategory: 'activewear', gender: 'women', colors: 'blue,grey,black', sizes: 'S,M,L' },
      { name: 'Resort Beachwear Cover-up', brand: 'Zara', price: 29.0, originalPrice: 39.0, discountPercent: 25, rating: 4.7, ratingCount: 18, imageUrl: '/assets/cat_beachwear.png', isNew: false, isSale: true, category: 'beachwear', subcategory: 'beachwear', gender: 'women', colors: 'white,tan,black,red', sizes: 'S,M,L' },
      { name: 'Cozy Knit Cardigan', brand: 'Mango', price: 38.0, rating: 4.9, ratingCount: 22, imageUrl: '/assets/cat_cardigans.png', isNew: true, isSale: false, category: 'sweaters', subcategory: 'sweaters', gender: 'women', colors: 'tan,grey,white', sizes: 'S,M,L' },
      { name: 'Cargo Streetwear Trousers', brand: 'Jack & Jones', price: 48.0, rating: 4.6, ratingCount: 20, imageUrl: '/assets/cat_cargo.png', isNew: true, isSale: false, category: 'pants', subcategory: 'pants', gender: 'men', colors: 'tan,black,green', sizes: 'M,L,XL' },
      { name: 'Classic Jeanswear Jacket', brand: 'Levi\'s', price: 65.0, rating: 4.9, ratingCount: 34, imageUrl: '/assets/product_denim_jacket.png', isNew: true, isSale: false, category: 'jackets', subcategory: 'jeans', gender: 'women', colors: 'blue,grey,black', sizes: 'S,M,L' },
      { name: 'Soft Velvet Loungewear', brand: 'H&M', price: 34.0, rating: 4.5, ratingCount: 16, imageUrl: '/assets/cat_loungewear.png', isNew: true, isSale: false, category: 'loungewear', subcategory: 'loungewear', gender: 'women', colors: 'pink,grey,white', sizes: 'S,M,L' },
      { name: 'Executive Office Blazer', brand: 'Zara', price: 79.0, rating: 4.8, ratingCount: 25, imageUrl: '/assets/cat_officestyle.png', isNew: true, isSale: false, category: 'jackets', subcategory: 'blouses', gender: 'women', colors: 'black,tan', sizes: 'S,M,L' },
      { name: 'Classic Trench Outerwear', brand: 'Burberry', price: 120.0, rating: 5.0, ratingCount: 40, imageUrl: '/assets/cat_outerwear.png', isNew: true, isSale: false, category: 'outerwear', subcategory: 'jackets', gender: 'women', colors: 'tan,black', sizes: 'S,M,L' },
      { name: 'Glamour Partywear Dress', brand: 'Dorothy Perkins', price: 59.0, rating: 4.9, ratingCount: 30, imageUrl: '/assets/cat_partywear.png', isNew: true, isSale: false, category: 'dresses', subcategory: 'partywear', gender: 'women', colors: 'silver,black,red,white,tan,gold', sizes: 'S,M,L' },
      { name: 'Satin Silk Sleepwear Set', brand: 'H&M', price: 26.0, rating: 4.7, ratingCount: 14, imageUrl: '/assets/cat_sleepwear.png', isNew: true, isSale: false, category: 'sleepwear', subcategory: 'sleepwear', gender: 'women', colors: 'pink,white,black', sizes: 'S,M,L' },
      { name: 'Athletic Sportswear Top', brand: 'adidas', price: 28.0, rating: 4.6, ratingCount: 19, imageUrl: '/assets/cat_sportswear.png', isNew: true, isSale: false, category: 'activewear', subcategory: 'sportswear', gender: 'women', colors: 'black,white,red', sizes: 'S,M,L' },
      { name: 'Tropical Swimwear Suit', brand: 'Zara', price: 32.0, originalPrice: 45.0, discountPercent: 28, rating: 4.8, ratingCount: 27, imageUrl: '/assets/cat_swimwear.png', isNew: false, isSale: true, category: 'swimwear', subcategory: 'swimwear', gender: 'women', colors: 'blue,red,white', sizes: 'S,M,L' },
      { name: 'Urban Streetwear Hoodie', brand: 'Nike', price: 54.0, rating: 4.8, ratingCount: 38, imageUrl: '/assets/cat_urbanwear.png', isNew: true, isSale: false, category: 'hoodies', subcategory: 'urbanwear', gender: 'men', colors: 'grey,black,tan', sizes: 'M,L,XL' },
      { name: 'Vintage Leather Jacket', brand: 'Mango', price: 95.0, rating: 4.9, ratingCount: 31, imageUrl: '/assets/cat_vintage.png', isNew: true, isSale: false, category: 'jackets', subcategory: 'vintage', gender: 'women', colors: 'brown,black', sizes: 'S,M,L' },
      { name: 'High-Waist Pleated Mini Skirt', brand: 'Mango', price: 35.0, rating: 4.8, ratingCount: 24, imageUrl: '/assets/women_pleated_mini_skirt.png', isNew: true, isSale: false, category: 'skirts', subcategory: 'skirts', gender: 'women', colors: 'silver,black,red,white,gold,tan', sizes: 'XS,S,M,L' },
      { name: 'Noir Signature Trench Coat', brand: 'Zara', price: 110.0, rating: 5.0, ratingCount: 18, imageUrl: '/assets/black_collection_banner.png', isNew: true, isSale: false, category: 'outerwear', subcategory: 'outerwear', gender: 'women', colors: 'black', sizes: 'S,M,L' },
    ];

    const savedProducts = await this.productRepository.save(mockProducts);
    console.log(`Successfully seeded database with ${savedProducts.length} products.`);
    
    // Seed reviews mapping them to the newly generated product IDs
    await this.seedReviewsForProducts(savedProducts);
  }

  private async seedReviewsForProducts(products: Product[]) {
    const reviewers = [
      'Helena P.', 'Kimberly M.', 'Samuel L.', 'Sophia B.', 'Oliver T.',
      'Emma W.', 'Jackson D.', 'Mia K.', 'Lucas N.', 'Isabella C.'
    ];

    const star5Reviews = [
      "Absolutely love this! The quality is amazing and fits perfectly.",
      "Exceeded my expectations. Highly recommend!",
      "Super comfortable and stylish. Will definitely buy again!",
      "The material is incredibly soft and premium. Perfect purchase."
    ];

    const star4Reviews = [
      "Very nice fit, though the color is slightly different than the picture.",
      "Great quality for the price. Fast shipping and good service.",
      "Comfy and fits well, perfect for everyday wear.",
      "Good quality fabric, just a bit long in the sleeves."
    ];

    const star3Reviews = [
      "It is decent, but the sizing runs slightly smaller than standard.",
      "Average quality, but looks nice for casual outings.",
      "Nice design, but the material is a bit thinner than expected."
    ];

    const star2Reviews = [
      "Not the best material, felt a bit cheap after the first wash.",
      "The fit was very weird on me, and sizing wasn't accurate."
    ];

    const mockReviews: Partial<Review>[] = [];

    // Seed reviews for every product
    for (const product of products) {
      // Each product gets 3 to 6 reviews
      const numReviews = Math.floor(Math.random() * 4) + 3;
      
      for (let i = 0; i < numReviews; i++) {
        const reviewer = reviewers[Math.floor(Math.random() * reviewers.length)];
        
        // Distribute ratings: mostly 4 and 5 stars to make the products look good
        const rand = Math.random();
        let rating = 5;
        let comment = star5Reviews[Math.floor(Math.random() * star5Reviews.length)];

        if (rand < 0.1) {
          rating = 2;
          comment = star2Reviews[Math.floor(Math.random() * star2Reviews.length)];
        } else if (rand < 0.2) {
          rating = 3;
          comment = star3Reviews[Math.floor(Math.random() * star3Reviews.length)];
        } else if (rand < 0.5) {
          rating = 4;
          comment = star4Reviews[Math.floor(Math.random() * star4Reviews.length)];
        }

        // Attach a mock photo occasionally (simulate user review photo)
        let photos = '';
        if (Math.random() < 0.3) {
          photos = product.imageUrl;
        }

        // Random date within the last 90 days
        const daysAgo = Math.floor(Math.random() * 90);
        const createdAt = new Date();
        createdAt.setDate(createdAt.getDate() - daysAgo);

        mockReviews.push({
          productId: product.id,
          userName: reviewer,
          rating,
          comment,
          createdAt,
          helpfulCount: Math.floor(Math.random() * 15),
          photos
        });
      }
    }

    await this.reviewRepository.save(mockReviews);
    console.log(`Successfully seeded database with ${mockReviews.length} product reviews.`);
  }

  async getNewProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { isNew: true } });
  }

  async getSaleProducts(): Promise<Product[]> {
    return this.productRepository.find({ where: { isSale: true } });
  }

  async getAllProducts(search?: string): Promise<Product[]> {
    if (search && search.trim() !== '') {
      const q = `%${search.toLowerCase().trim()}%`;
      return this.productRepository
        .createQueryBuilder('product')
        .where(
          '(LOWER(product.name) LIKE :q OR LOWER(product.brand) LIKE :q OR LOWER(product.category) LIKE :q OR LOWER(product.subcategory) LIKE :q OR LOWER(product.colors) LIKE :q OR LOWER(product.gender) LIKE :q)',
          { q },
        )
        .getMany();
    }
    return this.productRepository.find();
  }

  async getProductById(id: number): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  async getReviewsByProductId(productId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { productId },
      order: { createdAt: 'DESC' },
    });
  }

  async createReview(productId: number, data: Partial<Review>): Promise<Review> {
    const review = this.reviewRepository.create({
      ...data,
      productId,
      createdAt: new Date(),
      helpfulCount: 0,
    });
    const savedReview = await this.reviewRepository.save(review);
    
    // Recalculate average rating and review count
    const allProductReviews = await this.reviewRepository.find({ where: { productId } });
    if (allProductReviews.length > 0) {
      const avgRating = allProductReviews.reduce((sum, r) => sum + r.rating, 0) / allProductReviews.length;
      await this.productRepository.update(productId, {
        rating: Math.round(avgRating * 10) / 10,
        ratingCount: allProductReviews.length
      });
    }
    
    return savedReview;
  }
}

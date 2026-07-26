import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/product.entity';
import { Review } from './products/review.entity';
import { ProductsModule } from './products/products.module';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
import { Order } from './orders/order.entity';
import { OrdersModule } from './orders/orders.module';
import { Address } from './addresses/address.entity';
import { AddressesModule } from './addresses/addresses.module';
import { PaymentMethod } from './payments/payment-method.entity';
import { PaymentsModule } from './payments/payments.module';
import { Favorite } from './favorites/favorite.entity';
import { FavoritesModule } from './favorites/favorites.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load .env relative to current working directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '5432', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Product, User, Review, Order, Address, PaymentMethod, Favorite],
      synchronize: true, // Auto-create tables in development
      ssl: {
        rejectUnauthorized: false, // Supabase SSL connection requirement
      },
    }),
    ProductsModule,
    AuthModule,
    OrdersModule,
    AddressesModule,
    PaymentsModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


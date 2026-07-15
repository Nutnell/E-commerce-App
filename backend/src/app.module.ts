import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './products/product.entity';
import { ProductsModule } from './products/products.module';
import { User } from './auth/user.entity';
import { AuthModule } from './auth/auth.module';
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
      entities: [Product, User],
      synchronize: true, // Auto-create tables in development
      ssl: {
        rejectUnauthorized: false, // Supabase SSL connection requirement
      },
    }),
    ProductsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column('float')
  price: number;

  @Column('float', { nullable: true })
  originalPrice: number;

  @Column('int', { nullable: true })
  discountPercent: number;

  @Column('float')
  rating: number;

  @Column('int')
  ratingCount: number;

  @Column()
  imageUrl: string;

  @Column({ default: false })
  isNew: boolean;

  @Column({ default: false })
  isSale: boolean;

  @Column({ default: 'other' })
  category: string;

  @Column({ default: 'other' })
  subcategory: string;

  @Column({ default: 'women' })
  gender: string;

  @Column({ default: '' })
  colors: string;

  @Column({ default: '' })
  sizes: string;
}

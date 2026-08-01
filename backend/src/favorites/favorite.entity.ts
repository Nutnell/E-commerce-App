import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  productId: number;

  @Column()
  productName: string;

  @Column({ nullable: true })
  brand: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  size: string;

  @Column('float')
  price: number;

  @Column({ nullable: true })
  oldPrice: number;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: 0 })
  rating: number;

  @Column({ default: 0 })
  reviewCount: number;

  @Column({ default: false })
  isSoldOut: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

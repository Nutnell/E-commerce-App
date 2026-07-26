import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  @Column({ unique: true })
  orderNumber: string;

  @Column('json', { nullable: true })
  items: any;

  @Column('json', { nullable: true })
  shippingAddress: any;

  @Column('json', { nullable: true })
  paymentMethod: any;

  @Column('json', { nullable: true })
  deliveryMethod: any;

  @Column('float', { default: 0 })
  subtotal: number;

  @Column('float', { default: 0 })
  discount: number;

  @Column('float', { default: 0 })
  deliveryFee: number;

  @Column('float', { default: 0 })
  totalAmount: number;

  @Column({ default: 'processing' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

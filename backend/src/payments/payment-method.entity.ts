import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('payment_methods')
export class PaymentMethod {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  userId: string;

  // PCI-DSS Compliance: Stored strictly as masked string (e.g., "•••• •••• •••• 4242"), never full PAN
  @Column()
  cardNumber: string;

  @Column({ nullable: true })
  lastFourDigits: string;

  // Tokenized payment reference ID from payment processor (e.g. Stripe/Square token)
  @Column({ nullable: true })
  cardTokenRef: string;

  @Column()
  cardHolderName: string;

  @Column({ nullable: true })
  expiryDate: string;

  @Column({ default: 'mastercard' })
  cardType: string;

  @Column({ default: false })
  isDefault: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

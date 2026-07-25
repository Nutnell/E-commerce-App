import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  userName: string;

  @Column('float')
  rating: number;

  @Column('text')
  comment: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: 0 })
  helpfulCount: number;

  @Column({ default: '' })
  photos: string; // Comma-separated image filenames
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentRepository: Repository<PaymentMethod>,
  ) {}

  async create(cardData: Partial<PaymentMethod>): Promise<PaymentMethod> {
    if (cardData.isDefault && cardData.userId) {
      await this.paymentRepository.update(
        { userId: cardData.userId },
        { isDefault: false },
      );
    }
    const newCard = this.paymentRepository.create(cardData);
    return await this.paymentRepository.save(newCard);
  }

  async findAll(userId?: string): Promise<PaymentMethod[]> {
    if (userId) {
      return await this.paymentRepository.find({
        where: { userId },
        order: { isDefault: 'DESC', createdAt: 'DESC' },
      });
    }
    return await this.paymentRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async setDefault(id: string, userId?: string): Promise<PaymentMethod> {
    if (userId) {
      await this.paymentRepository.update({ userId }, { isDefault: false });
    }
    const card = await this.paymentRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Payment card with ID "${id}" not found`);
    }
    card.isDefault = true;
    return await this.paymentRepository.save(card);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const res = await this.paymentRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Payment card with ID "${id}" not found`);
    }
    return { success: true };
  }
}

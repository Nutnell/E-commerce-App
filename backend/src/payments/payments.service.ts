import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './payment-method.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(PaymentMethod)
    private readonly paymentRepository: Repository<PaymentMethod>,
  ) {}

  // PCI-DSS Compliance helper: Never retain full credit card numbers in persistent storage
  private maskCardNumber(rawNum?: string): { masked: string; last4: string } {
    if (!rawNum) return { masked: '•••• •••• •••• 0000', last4: '0000' };
    const digits = rawNum.replace(/\D/g, '');
    const last4 = digits.slice(-4) || '0000';
    return {
      masked: `•••• •••• •••• ${last4}`,
      last4,
    };
  }

  async create(cardData: Partial<PaymentMethod>): Promise<PaymentMethod> {
    if (cardData.isDefault && cardData.userId) {
      await this.paymentRepository.update(
        { userId: cardData.userId },
        { isDefault: false },
      );
    }
    const { masked, last4 } = this.maskCardNumber(cardData.cardNumber);
    const newCard = this.paymentRepository.create({
      ...cardData,
      cardNumber: masked, // Full card PAN is never stored
      lastFourDigits: last4,
      cardTokenRef: cardData.cardTokenRef || `tok_pci_${Date.now()}_${last4}`,
    });
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
    // Security Fix #5: Verify the card belongs to the requesting user
    if (userId && card.userId !== userId) {
      throw new ForbiddenException('You do not have access to this payment method');
    }
    card.isDefault = true;
    return await this.paymentRepository.save(card);
  }

  // Security Fix #5: Verify ownership before deleting
  async remove(id: string, userId?: string): Promise<{ success: boolean }> {
    const card = await this.paymentRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Payment card with ID "${id}" not found`);
    }
    if (userId && card.userId !== userId) {
      throw new ForbiddenException('You do not have access to this payment method');
    }
    await this.paymentRepository.delete(id);
    return { success: true };
  }
}

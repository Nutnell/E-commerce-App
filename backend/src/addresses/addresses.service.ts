import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async create(addressData: Partial<Address>): Promise<Address> {
    if (addressData.isDefault && addressData.userId) {
      await this.addressRepository.update(
        { userId: addressData.userId },
        { isDefault: false },
      );
    }
    const newAddress = this.addressRepository.create(addressData);
    return await this.addressRepository.save(newAddress);
  }

  async findAll(userId?: string): Promise<Address[]> {
    if (userId) {
      return await this.addressRepository.find({
        where: { userId },
        order: { isDefault: 'DESC', createdAt: 'DESC' },
      });
    }
    return await this.addressRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async setDefault(id: string, userId?: string): Promise<Address> {
    if (userId) {
      await this.addressRepository.update({ userId }, { isDefault: false });
    }
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
    // Security Fix #5: Verify the address belongs to the requesting user
    if (userId && address.userId !== userId) {
      throw new ForbiddenException('You do not have access to this address');
    }
    address.isDefault = true;
    return await this.addressRepository.save(address);
  }

  // Security Fix #5: Verify ownership before deleting
  async remove(id: string, userId?: string): Promise<{ success: boolean }> {
    const address = await this.addressRepository.findOne({ where: { id } });
    if (!address) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
    if (userId && address.userId !== userId) {
      throw new ForbiddenException('You do not have access to this address');
    }
    await this.addressRepository.delete(id);
    return { success: true };
  }
}

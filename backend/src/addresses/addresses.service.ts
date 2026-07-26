import { Injectable, NotFoundException } from '@nestjs/common';
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
    address.isDefault = true;
    return await this.addressRepository.save(address);
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const res = await this.addressRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Address with ID "${id}" not found`);
    }
    return { success: true };
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async create(favData: Partial<Favorite>): Promise<Favorite> {
    const existing = await this.favoriteRepository.findOne({
      where: {
        userId: favData.userId || undefined,
        productId: favData.productId,
        size: favData.size,
      },
    });

    if (existing) {
      return existing;
    }

    const newFav = this.favoriteRepository.create(favData);
    return await this.favoriteRepository.save(newFav);
  }

  async findAll(userId?: string): Promise<Favorite[]> {
    if (userId) {
      return await this.favoriteRepository.find({
        where: { userId },
        order: { createdAt: 'DESC' },
      });
    }
    return await this.favoriteRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async remove(id: string): Promise<{ success: boolean }> {
    const res = await this.favoriteRepository.delete(id);
    if (res.affected === 0) {
      throw new NotFoundException(`Favorite item with ID "${id}" not found`);
    }
    return { success: true };
  }
}

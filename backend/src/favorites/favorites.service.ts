import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  // Security Fix #5: Verify ownership before deleting
  async remove(id: string, userId?: string): Promise<{ success: boolean }> {
    const favorite = await this.favoriteRepository.findOne({ where: { id } });
    if (!favorite) {
      throw new NotFoundException(`Favorite item with ID "${id}" not found`);
    }
    if (userId && favorite.userId !== userId) {
      throw new ForbiddenException('You do not have access to this favorite');
    }
    await this.favoriteRepository.delete(id);
    return { success: true };
  }
}

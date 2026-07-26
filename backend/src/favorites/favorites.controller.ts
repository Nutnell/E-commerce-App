import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.entity';

@Controller('api/favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() favData: Partial<Favorite>): Promise<Favorite> {
    return await this.favoritesService.create(favData);
  }

  @Get()
  async findAll(@Query('userId') userId?: string): Promise<Favorite[]> {
    return await this.favoritesService.findAll(userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return await this.favoritesService.remove(id);
  }
}

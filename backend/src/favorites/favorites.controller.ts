import { Controller, Get, Post, Body, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Security Fix #4: All favorites endpoints now require authentication
@Controller('api/favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  async create(@Body() favData: Partial<Favorite>, @Req() req: any): Promise<Favorite> {
    // Security Fix #5: Force userId from authenticated token
    return await this.favoritesService.create({ ...favData, userId: req.user.id });
  }

  @Get()
  async findAll(@Req() req: any): Promise<Favorite[]> {
    // Security Fix #5: Users can only see their own favorites
    return await this.favoritesService.findAll(req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any): Promise<{ success: boolean }> {
    // Security Fix #5: Only delete own favorites
    return await this.favoritesService.remove(id, req.user.id);
  }
}

import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

// Security Fix #4: All address endpoints now require authentication
@Controller('api/addresses')
@UseGuards(JwtAuthGuard)
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(@Body() addressData: Partial<Address>, @Req() req: any): Promise<Address> {
    // Security Fix #5: Force userId from authenticated token
    return await this.addressesService.create({ ...addressData, userId: req.user.id });
  }

  @Get()
  async findAll(@Req() req: any): Promise<Address[]> {
    // Security Fix #5: Users can only see their own addresses
    return await this.addressesService.findAll(req.user.id);
  }

  @Patch(':id/default')
  async setDefault(
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<Address> {
    // Security Fix #5: Only set default on own addresses
    return await this.addressesService.setDefault(id, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: any): Promise<{ success: boolean }> {
    // Security Fix #5: Only delete own addresses
    return await this.addressesService.remove(id, req.user.id);
  }
}

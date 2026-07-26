import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { Address } from './address.entity';

@Controller('api/addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(@Body() addressData: Partial<Address>): Promise<Address> {
    return await this.addressesService.create(addressData);
  }

  @Get()
  async findAll(@Query('userId') userId?: string): Promise<Address[]> {
    return await this.addressesService.findAll(userId);
  }

  @Patch(':id/default')
  async setDefault(
    @Param('id') id: string,
    @Body('userId') userId?: string,
  ): Promise<Address> {
    return await this.addressesService.setDefault(id, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ success: boolean }> {
    return await this.addressesService.remove(id);
  }
}

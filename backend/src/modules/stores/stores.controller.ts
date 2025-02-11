import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { AuthGuard } from '../auth/jwt-auth.guard';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createStore(@Body() body: { userId: number; name: string; slug: string }) {
    return this.storesService.createStore(body.userId, body.name, body.slug);
  }

  @UseGuards(AuthGuard)
  @Get(':userId')
  async getStoresByUser(@Param('userId') userId: number) {
    return this.storesService.getStoresByUser(userId);
  }

  @UseGuards(AuthGuard)
  @Post(':storeId/verify')
  async verifyStore(@Param('storeId') storeId: number) {
    return this.storesService.verifyStore(storeId);
  }
}

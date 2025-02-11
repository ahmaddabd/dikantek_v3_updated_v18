import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { ShippingService } from './shipping.service';

@Controller('store-shipping')
@UseGuards(AuthGuard)
export class StoreShippingController {
  constructor(private readonly shippingService: ShippingService) {}

  @Post('update')
  async updateShippingSettings(@Req() req, @Body() body: { providers: string[]; rates: any }) {
    return this.shippingService.updateShippingSettings(req.store.id, body.providers, body.rates);
  }

  @Get('calculate')
  async calculateShipping(@Req() req, @Body() body: { destination: string }) {
    return this.shippingService.calculateShippingCost(req.store.id, body.destination);
  }
}

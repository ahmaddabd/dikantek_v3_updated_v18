import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { StoresService } from '../stores/stores.service';

@Controller('store-payment')
@UseGuards(AuthGuard)
export class StorePaymentController {
  constructor(private readonly storesService: StoresService) {}

  @Post('update')
  async updatePaymentSettings(@Req() req, @Body() body: { gateway: string; config: string }) {
    return this.storesService.updatePaymentSettings(req.store.id, body.gateway, body.config);
  }
}

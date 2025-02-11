import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '../auth/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('store-analytics')
@UseGuards(AuthGuard)
export class StoreAnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('sales')
  async getSalesReport(@Req() req) {
    return this.analyticsService.getSalesReport(req.store.id);
  }

  @Get('top-products')
  async getTopSellingProducts(@Req() req) {
    return this.analyticsService.getTopSellingProducts(req.store.id);
  }

  @Get('sales-by-region')
  async getSalesByRegion(@Req() req) {
    return this.analyticsService.getSalesByRegion(req.store.id);
  }
}

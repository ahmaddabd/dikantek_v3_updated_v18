import { Injectable } from '@nestjs/common';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class InventoryAlertsService {
  constructor(private readonly notificationsService: NotificationsService) {}

  async checkStockLevels(productId: number, stockQuantity: number, storeId: number, ownerId: number) {
    if (stockQuantity <= 5) {
      await this.notificationsService.sendNotification(
        storeId,
        ownerId,
        'low_stock',
        `تنبيه: المخزون لمنتج (ID: ${productId}) منخفض (${stockQuantity} قطع متبقية).`
      );
    }
  }
}

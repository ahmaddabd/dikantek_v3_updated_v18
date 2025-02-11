import { Injectable, NestMiddleware } from '@nestjs/common';
import { StoresService } from '../modules/stores/stores.service';

@Injectable()
export class StoreMiddleware implements NestMiddleware {
  constructor(private readonly storesService: StoresService) {}

  async use(req: any, res: any, next: () => void) {
    const host = req.headers.host; // استخراج الدومين من الطلب
    const store = await this.storesService.getStoreByDomain(host);

    if (store) {
      req.store = store; // ربط المتجر بالطلب الحالي
    }
    
    next();
  }
}

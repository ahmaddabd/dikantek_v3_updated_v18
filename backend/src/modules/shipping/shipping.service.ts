import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/store.entity';

@Injectable()
export class ShippingService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async updateShippingSettings(storeId: number, providers: string[], rates: any) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    store.shippingProviders = JSON.stringify(providers);
    store.shippingRates = JSON.stringify(rates);
    return this.storesRepository.save(store);
  }

  async calculateShippingCost(storeId: number, destination: string) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store || !store.shippingRates) throw new NotFoundException('Shipping settings not found');

    const rates = JSON.parse(store.shippingRates);
    return rates[destination] || 0; // إذا لم يكن هناك سعر للمنطقة، يتم إرجاع 0
  }
}

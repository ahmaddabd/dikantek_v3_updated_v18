import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from './store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async updateStoreLanguage(storeId: number, lang: string) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    store.defaultLanguage = lang;
    return this.storesRepository.save(store);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Store } from '../stores/store.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async updateTheme(storeId: number, themeName: string, config: string) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    store.selectedTheme = themeName;
    store.themeConfig = config;
    return this.storesRepository.save(store);
  }

  async getTheme(storeId: number) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    return { selectedTheme: store.selectedTheme, themeConfig: store.themeConfig };
  }
}

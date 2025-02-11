import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/order.entity';
import { Store } from '../stores/store.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Store)
    private storesRepository: Repository<Store>,
  ) {}

  async getSalesReport(storeId: number) {
    const store = await this.storesRepository.findOne({ where: { id: storeId } });
    if (!store) throw new NotFoundException('Store not found');

    const sales = await this.ordersRepository
      .createQueryBuilder('order')
      .select('SUM(order.totalAmount)', 'totalSales')
      .addSelect('COUNT(order.id)', 'totalOrders')
      .where('order.storeId = :storeId', { storeId })
      .getRawOne();

    return {
      totalSales: sales.totalSales || 0,
      totalOrders: sales.totalOrders || 0,
    };
  }

  async getTopSellingProducts(storeId: number) {
    return this.ordersRepository
      .createQueryBuilder('order')
      .leftJoin('order.products', 'product')
      .select('product.name', 'productName')
      .addSelect('SUM(product.price)', 'totalRevenue')
      .addSelect('COUNT(product.id)', 'totalSold')
      .where('order.storeId = :storeId', { storeId })
      .groupBy('product.name')
      .orderBy('totalSold', 'DESC')
      .limit(5)
      .getRawMany();
  }

  async getSalesByRegion(storeId: number) {
    return this.ordersRepository
      .createQueryBuilder('order')
      .select('order.shippingRegion', 'region')
      .addSelect('SUM(order.totalAmount)', 'totalSales')
      .where('order.storeId = :storeId', { storeId })
      .groupBy('order.shippingRegion')
      .getRawMany();
  }
}

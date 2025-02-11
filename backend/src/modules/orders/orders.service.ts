import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { Store } from '../stores/store.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        @InjectRepository(Store)
        private storesRepository: Repository<Store>,
        @InjectRedis() private readonly redis: Redis
    ) {}

    async createOrder(storeId: number, customerName: string, status: string, totalAmount: number): Promise<Order> {
        const store = await this.storesRepository.findOne({ where: { id: storeId } });

        if (!store) {
            throw new NotFoundException('Store not found');
        }

        const order = this.ordersRepository.create({ customerName, status, totalAmount, store });
        return await this.ordersRepository.save(order);
    }

    async getOrdersByStore(storeId: number): Promise<Order[]> {
        const cacheKey = `store:${storeId}:orders`;
        const cachedOrders = await this.redis.get(cacheKey);

        if (cachedOrders) {
            return JSON.parse(cachedOrders);
        }

        const orders = await this.ordersRepository.find({
            where: { store: { id: storeId } },
            relations: ['store'],
        });

        await this.redis.set(cacheKey, JSON.stringify(orders), 'EX', 600); // حفظ البيانات لمدة 10 دقائق
        return orders;
    }
}
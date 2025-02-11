import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { Store } from '../stores/store.entity';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
        @InjectRepository(Store)
        private storesRepository: Repository<Store>,
        @InjectRedis() private readonly redis: Redis
    ) {}

    async createProduct(storeId: number, name: string, description: string, price: number): Promise<Product> {
        const store = await this.storesRepository.findOne({ where: { id: storeId } });

        if (!store) {
            throw new NotFoundException('Store not found');
        }

        const product = this.productsRepository.create({ name, description, price, store });
        return await this.productsRepository.save(product);
    }

    async getProductsByStore(storeId: number): Promise<Product[]> {
        const cacheKey = `store:${storeId}:products`;
        const cachedProducts = await this.redis.get(cacheKey);

        if (cachedProducts) {
            return JSON.parse(cachedProducts);
        }

        const products = await this.productsRepository.find({
            where: { store: { id: storeId } },
            relations: ['store'],
        });

        await this.redis.set(cacheKey, JSON.stringify(products), 'EX', 600); // حفظ البيانات لمدة 10 دقائق
        return products;
    }
}
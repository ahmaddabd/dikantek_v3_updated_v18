import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async updateStock(productId: number, quantity: number) {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    if (product.stockQuantity < quantity) {
      throw new NotFoundException('Not enough stock available');
    }

    product.stockQuantity -= quantity;
    return this.productsRepository.save(product);
  }

  async restockProduct(productId: number, quantity: number) {
    const product = await this.productsRepository.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    product.stockQuantity += quantity;
    return this.productsRepository.save(product);
  }
}

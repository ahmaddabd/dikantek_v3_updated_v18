import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  stockQuantity: number; // كمية المخزون المتاحة

  @ManyToOne(() => Store, (store) => store.products, { nullable: false })
  store: Store;
}

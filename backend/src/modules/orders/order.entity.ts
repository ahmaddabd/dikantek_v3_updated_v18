import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.orders, { nullable: false })
  store: Store;

  @Column()
  totalAmount: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  shippingRegion: string;
}

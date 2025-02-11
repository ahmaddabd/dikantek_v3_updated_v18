import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.payments, { nullable: false })
  store: Store;
}

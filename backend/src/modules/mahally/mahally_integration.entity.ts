import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class MahallyIntegration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.mahallyIntegration)
  store: Store;

  @Column({ unique: true })
  mahallyStoreId: string; // المعرف الخاص بالمتجر في "محلي"

  @Column({ unique: true })
  apiKey: string; // مفتاح API الخاص بالتكامل مع "محلي"

  @Column({ default: true })
  isActive: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Integration {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.integrations)
  store: Store;

  @Column()
  serviceName: string; // اسم الأداة (Google Analytics, Facebook Pixel, QuickBooks, Zoho)

  @Column()
  apiKey: string; // مفتاح API الخاص بالخدمة

  @Column({ default: true })
  isActive: boolean;
}

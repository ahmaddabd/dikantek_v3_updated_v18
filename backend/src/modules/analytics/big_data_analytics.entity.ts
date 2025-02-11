import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class BigDataAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.analytics)
  store: Store;

  @Column()
  totalRevenue: number; // إجمالي الإيرادات

  @Column()
  totalOrders: number; // إجمالي الطلبات

  @Column()
  mostSoldProduct: string; // أكثر منتج مبيعًا

  @Column()
  peakSalesTime: string; // وقت الذروة للمبيعات

  @Column()
  customerRetentionRate: number; // نسبة احتفاظ العملاء

  @Column()
  predictedSalesNextMonth: number; // التوقعات للمبيعات القادمة

  @CreateDateColumn()
  reportDate: Date;
}

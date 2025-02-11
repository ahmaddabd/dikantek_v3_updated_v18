import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class StoreAnalytics {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.analytics)
  store: Store;

  @Column()
  totalSales: number; // إجمالي المبيعات

  @Column()
  totalOrders: number; // إجمالي عدد الطلبات

  @Column()
  averageOrderValue: number; // متوسط قيمة الطلب

  @Column()
  bestSellingProduct: string; // أفضل منتج مبيعًا

  @Column()
  returningCustomers: number; // عدد العملاء العائدين

  @Column()
  newCustomers: number; // عدد العملاء الجدد

  @CreateDateColumn()
  reportDate: Date;
}

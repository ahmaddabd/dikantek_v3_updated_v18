import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Store } from '../stores/store.entity';

@Entity()
export class Coupon {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Store, (store) => store.coupons)
  store: Store;

  @Column({ unique: true })
  code: string; // كود الكوبون مثل "SALE20"

  @Column('decimal')
  discountAmount: number; // نسبة الخصم أو المبلغ

  @Column({ default: false })
  isPercentage: boolean; // إذا كان الخصم نسبة مئوية أم لا

  @Column('decimal', { nullable: true })
  minOrderAmount: number; // الحد الأدنى للطلب

  @Column({ nullable: true })
  expiryDate: Date; // تاريخ انتهاء الصلاحية

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;
}

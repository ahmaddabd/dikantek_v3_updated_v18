import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  domain: string; // salla.sa/testshop

  @Column({ default: false })
  isVerified: boolean;

  @ManyToOne(() => User, (user) => user.stores, { nullable: false })
  owner: User;

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

  @Column({ default: 'default' })
  selectedTheme: string; // اسم القالب المختار

  @Column({ type: 'text', nullable: true })
  themeConfig: string; // JSON يحتوي على الألوان والخطوط والصور
}

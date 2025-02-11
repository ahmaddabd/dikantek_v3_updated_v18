import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Entity()
export class UserInteraction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.interactions)
  user: User;

  @ManyToOne(() => Product, (product) => product.interactions)
  product: Product;

  @Column()
  interactionType: string; // "view", "add_to_cart", "purchase"

  @CreateDateColumn()
  interactionDate: Date;
}

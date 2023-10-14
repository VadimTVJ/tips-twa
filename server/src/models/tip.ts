import {
  BaseEntity, Column,
  CreateDateColumn,
  Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
} from 'typeorm';
import { UserModel } from './user';
import { WaiterModel } from './waiter';

@Entity({ name: 'tip' })
export class TipModel extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @CreateDateColumn()
    create_date!: Date;

  @Column({ type: 'int', select: false })
    user_id!: number;

  @Column({ type: 'int', select: false })
    waiter_id!: number;

  @ManyToOne(() => UserModel, ({ tips }) => tips)
  @JoinColumn({ name: 'user_id' })
    user!: UserModel;

  @ManyToOne(() => WaiterModel, ({ tips }) => tips)
  @JoinColumn({ name: 'waiter_id' })
    waiter!: WaiterModel;

  @Column({ type: 'int' })
    amount!: number;

  @Column({ type: 'varchar' })
    currency!: string;
}

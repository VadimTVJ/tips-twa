import {
  BaseEntity, Column,
  Entity, OneToMany, PrimaryGeneratedColumn,
} from 'typeorm';
import { TipModel } from './tip';

@Entity({ name: 'waiter' })
export class WaiterModel extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @Column({ type: 'varchar' })
    name!: string;

  @Column({ type: 'varchar' })
    photo!: string;

  @Column({ type: 'varchar' })
    restaurant!: string;

  @OneToMany(() => TipModel, ({ waiter }) => waiter)
    tips!: TipModel[];
}

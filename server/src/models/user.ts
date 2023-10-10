import {
  BaseEntity, Column,
  CreateDateColumn,
  Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { TipModel } from './tip';

@Entity({ name: 'user' })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn()
    id!: number;

  @CreateDateColumn()
    create_date!: Date;

  @UpdateDateColumn()
    update_date!: Date;

  @Column({ type: 'bigint', unique: true })
    tg_id!: number;

  @OneToMany(() => TipModel, ({ user }) => user)
    tips!: TipModel[];
}

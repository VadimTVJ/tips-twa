import {
  BaseEntity, Column,
  Entity, PrimaryGeneratedColumn,
} from 'typeorm';

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
}

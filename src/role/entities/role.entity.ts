import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Unique
} from 'typeorm';
import { ROLE } from '../constants';

@Unique(["code"])
@Entity()
export class Role {
  @PrimaryGeneratedColumn({ comment: '角色id' })
  id: number;

  @Column({ comment: '角色名称' })
  name: string;

  @Column({ comment: '角色编码' })
  code?: ROLE;

  @Column({
    type: 'varchar',
    default: '',
    nullable: true,
    comment: '描述',
  })
  description?: string;

  @CreateDateColumn()
  createTime?: string;

  @UpdateDateColumn()
  updateTime?: string;
}

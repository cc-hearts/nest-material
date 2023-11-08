import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum PRIVILEGE_STATUS {
  ALLOW,
  DISABLED,
}
@Entity('privilege')
export class Privilege {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', comment: '权限名称' })
  name: string;

  @Column({ name: 'code', comment: '权限code' })
  code: string;

  @Column({
    default: PRIVILEGE_STATUS.ALLOW,
    comment: '权限状态',
  })
  status: PRIVILEGE_STATUS;

  @CreateDateColumn()
  createTime?: string;
}

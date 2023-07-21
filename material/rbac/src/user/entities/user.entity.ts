import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

import { USER_STATUS } from '../constants/user.constants';

@Unique(['mobile', 'username'])
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ default: null, comment: '名称' })
  name: string;

  @Column({ default: null, comment: '账号' })
  username: string;

  @Column({ default: null, comment: '密码' })
  password: string;

  @Column({
    name: 'mobile',
    default: null,
    comment: '手机号',
  })
  mobile: string;

  @Column({ default: null, comment: '邮箱' })
  email?: string;

  @Column({
    default: USER_STATUS.ENABLED,
    comment: '状态',
  })
  status?: USER_STATUS;

  @CreateDateColumn()
  createTime?: string;

  @UpdateDateColumn()
  updateTime?: string;
}

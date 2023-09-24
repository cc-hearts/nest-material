import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user_role')
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '用户id' })
  uid: number;

  @Column({ comment: '角色id' })
  rid: number;
}

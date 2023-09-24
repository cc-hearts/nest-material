import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role_privilege')
export class RolePrivilege {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '角色id' })
  rid: number;

  @Column({ comment: '权限id' })
  pid: number;
}

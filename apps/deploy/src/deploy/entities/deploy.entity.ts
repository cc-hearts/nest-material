import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('c_deploy')
export class Deploy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', comment: '配置文件', nullable: true })
  config: string;

  @Column({ name: 'root_path', comment: '部署根路径' })
  rootPath: string;

  @Column({ name: 'name', comment: '部署名称' })
  name: string;

  @Column({ name: 'shell_command', comment: '部署的脚本' })
  shellCommand: string;

  @CreateDateColumn()
  createTime: string;

  @UpdateDateColumn()
  updateTime: string;
}

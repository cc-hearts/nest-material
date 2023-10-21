import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {MENU_TYPE} from "../constant";
import {IsEnum} from "class-validator";

@Entity('menu')
export class Menu {

  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar', name: 'name', comment: '菜单名称'})
  name: string

  @Column({type: 'varchar', name: 'icon', comment: '图标'})
  icon: string

  @IsEnum(MENU_TYPE)
  @Column({type: 'varchar', name: 'type', comment: '菜单类型'})
  type: MENU_TYPE

  @Column({
    type: 'varchar', name: 'path', comment: '路由地址', nullable: true
  })
  path?: string

  @Column({type: 'varchar', name: 'pid', comment: '上级菜单 0 则为顶级菜单', default: 0})
  pid?: number

  @Column({type: 'varchar', name: 'components', comment: '组件地址', nullable: true})
  components?: string

  @Column({type: 'int', name: 'sort', comment: '排序'})
  sort: number

}

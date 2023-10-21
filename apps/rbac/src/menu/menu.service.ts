import {Inject, Injectable} from '@nestjs/common';
import {CreateMenuDto} from './dto/create-menu.dto';
import {UpdateMenuDto} from './dto/update-menu.dto';
import {Repository} from "typeorm";
import {Menu} from "./entities/menu.entity";
import {BaseResponse} from "../../../../libs/utils/baseResponse";
import {MENU_PROVIDER} from "./providers/menu.provider";
import {FindMenuDto} from "./dto/find-menu.dto";
import {MENU_TYPE} from "./constant";

@Injectable()
export class MenuService {
  constructor(
    @Inject(MENU_PROVIDER)
    private readonly menuRepository: Repository<Menu>
  ) {

  }


  async getMenuTree() {
    const dbList = await this.menuRepository.find()
    const menuTree = dbList.filter(target => target.type === MENU_TYPE.DIRECTORY)
    const map = new Map<number, Menu>()
    dbList.forEach(target => {
      map.set(target.id, target)
    })
    const children = dbList.filter(target => target.type !== MENU_TYPE.DIRECTORY)
    children.forEach(target => {
      const pMenu = map.get(Number(target.pid))
      if (pMenu) {
        if (!Reflect.get(pMenu, 'children')) {
          Reflect.set(pMenu, 'children', [])
        }
        const child = Reflect.get(pMenu, 'children')
        child.push(target)
      }
    })
    return new BaseResponse("获取菜单树成功", menuTree)
  }

  formatPath(path: string) {
    if (path.startsWith('/'))
      return '/' + path
    return path
  }

  async create(createMenuDto: CreateMenuDto) {
    createMenuDto.path = this.formatPath(createMenuDto.path)
    createMenuDto.components = this.formatPath(createMenuDto.components)

    await this.menuRepository.save(createMenuDto)
    return new BaseResponse("创建成功")
  }

  findAll(findMenuDto: FindMenuDto) {
    return this.getMenuTree()
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}

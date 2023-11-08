import { Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { Repository } from 'typeorm';
import { Menu } from './entities/menu.entity';
import { BaseResponse } from '../../../../libs/utils/baseResponse';
import { MENU_PROVIDER } from './providers/menu.provider';
import { FindMenuDto } from './dto/find-menu.dto';
import { MENU_TYPE } from './constant';

@Injectable()
export class MenuService {
  constructor(
    @Inject(MENU_PROVIDER)
    private readonly menuRepository: Repository<Menu>,
  ) {}

  async getMenuTree() {
    const dbList = await this.menuRepository.find();
    const menuTree = dbList.filter(
      (target) => target.type === MENU_TYPE.DIRECTORY,
    );
    const map = new Map<number, Menu>();
    dbList.forEach((target) => {
      map.set(target.id, target);
    });
    const children = dbList.filter(
      (target) => target.type !== MENU_TYPE.DIRECTORY,
    );
    [...children].forEach((target) => {
      const pMenu = map.get(Number(target.pid));
      if (pMenu) {
        if (!Reflect.get(pMenu, 'children')) {
          Reflect.set(pMenu, 'children', []);
        }
        const child = Reflect.get(pMenu, 'children');
        const index = children.findIndex((item) => item === target);
        if (index > -1) {
          children.splice(index, 1);
        }
        child.push(target);
      }
    });
    return new BaseResponse(
      '获取菜单树成功',
      [...children, ...menuTree].sort((a, b) => a.sort - b.sort),
    );
  }

  formatPath(path: string) {
    if (!path.startsWith('/')) return '/' + path;
    return path;
  }

  async create(createMenuDto: CreateMenuDto) {
    this.formatPathField(createMenuDto);

    await this.menuRepository.save(createMenuDto);
    return new BaseResponse('创建成功');
  }

  findAll(findMenuDto: FindMenuDto) {
    return this.getMenuTree();
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  formatField(fieldArray: string[], target: Record<string, any>) {
    fieldArray.forEach((field) => {
      if (Reflect.has(target, field) && Reflect.get(target, field)) {
        Reflect.set(target, field, this.formatPath(Reflect.get(target, field)));
      }
    });
  }

  formatPathField(target: Record<string, any>) {
    this.formatField(['path', 'components'], target);
  }

  async update(id: number, updateMenuDto: UpdateMenuDto) {
    this.formatPathField(updateMenuDto);

    await this.menuRepository.update(id, updateMenuDto);
    return new BaseResponse('更新成功');
  }

  async remove(ids: string[]) {
    await this.menuRepository.delete(ids);
    return new BaseResponse('删除成功');
  }
}

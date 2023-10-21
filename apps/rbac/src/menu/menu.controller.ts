import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {MenuService} from './menu.service';
import {CreateMenuDto} from './dto/create-menu.dto';
import {UpdateMenuDto} from './dto/update-menu.dto';
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {FindMenuDto} from "./dto/find-menu.dto";

@ApiTags("路由菜单")
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {
  }

  @ApiOperation({summary: '添加路由菜单'})
  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  @ApiOperation({summary: '获取菜单树'})
  @Post('tree')
  getMenuTree() {
    console.log('data')
    return this.menuService.getMenuTree()
  }

  @ApiOperation({summary: '获取路由菜单列表'})
  @Get('list')
  findAll(@Query() findMenuDto: FindMenuDto) {
    return this.menuService.findAll(findMenuDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}

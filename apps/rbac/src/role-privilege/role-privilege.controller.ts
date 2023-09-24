import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RolePrivilegeService } from './role-privilege.service';
import { CreateRolePrivilegeDto } from './dto/create-role-privilege.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('角色权限模块关联')
@Controller('role-privilege')
export class RolePrivilegeController {
  constructor(private readonly rolePrivilegeService: RolePrivilegeService) {}

  @ApiOperation({ summary: '创建角色-权限关联' })
  @Post()
  create(@Body() createRolePrivilegeDto: CreateRolePrivilegeDto) {
    return this.rolePrivilegeService.create(createRolePrivilegeDto);
  }

  @ApiOperation({ summary: '根据角色id获取所有的权限' })
  @Get('role/:id')
  getPrivilegeListByRid(@Param('id') id: string | number) {
    return this.rolePrivilegeService.getPrivilegeListByRid(+id);
  }

  @ApiOperation({ summary: '根据权限id获取所有的角色的关联关系' })
  @Get('privilege/:id')
  getRoleListByPid(@Param('id') id: string | number) {
    return this.rolePrivilegeService.getRoleListByPid(+id);
  }

  @ApiOperation({ summary: '根据角色id删除所有的权限关联' })
  @Delete('role/:id')
  removePrivilegeListByRid(@Param('id') rid: string | number) {
    return this.rolePrivilegeService.removePrivilegeListByRid(+rid);
  }

  @ApiOperation({ summary: '根据权限id删除所有的角色关联' })
  @Delete('privilege/:id')
  removeRoleListByPid(@Param('id') pid: string | number) {
    return this.rolePrivilegeService.removeRoleListByPid(+pid);
  }
}

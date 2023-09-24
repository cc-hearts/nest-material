import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RemoveUserRoleRelativeDto } from './dto/remove-user-role.dto';

@ApiTags('用户角色关联模块')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @ApiOperation({ summary: '添加用户-角色关联' })
  @Post()
  create(@Body() createUserRoleDto: CreateUserRoleDto) {
    return this.userRoleService.create(createUserRoleDto);
  }

  @ApiOperation({ summary: '根据用户id获取角色列表' })
  @Get('/uid/:id')
  getRoleListByUid(@Param('id') uid: string | number) {
    return this.userRoleService.getRoleListByUid(+uid);
  }

  @ApiOperation({ summary: '根据角色id获取用户列表' })
  @Get('rid/:id')
  getUserListByUid(@Param('id') rid: string | number) {
    return this.userRoleService.getUserListByRid(+rid);
  }

  @ApiOperation({ summary: '根据角色id删除所有的用户关联' })
  @Delete('rid/:id')
  removeUserListByRid(@Param('id') rid: string | number) {
    return this.userRoleService.removeUserListByRid(+rid);
  }

  @ApiOperation({ summary: '根据用户id删除所有的角色关联' })
  @Delete('uid/:id')
  removeRoleListByUid(@Param('id') uid: string | number) {
    return this.userRoleService.removeRoleListByUid(+uid);
  }

  @ApiOperation({ summary: '用户用户id和角色id删除' })
  @Post('remove')
  removeUserRoleRelative(
    @Body() removeUserRoleRelativeDto: RemoveUserRoleRelativeDto,
  ) {
    return this.userRoleService.removeUserRoleRelative(
      removeUserRoleRelativeDto,
    );
  }
}

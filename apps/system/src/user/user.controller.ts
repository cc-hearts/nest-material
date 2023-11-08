import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto, RefreshTokenDto } from './dto/login.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WhitePath } from '../../../../libs/decorators/whitePath';
import { Profile } from '../../../../libs/decorators/profile';
import type { IUserInfo } from '../../../../libs/typings/index';
import { GetToken } from '../../../../libs/decorators/token';
import { BaseResponse } from '../../../../libs/utils/baseResponse';

@ApiTags('用户模块')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    /** */
  }

  @WhitePath()
  @ApiOperation({ summary: '注册' })
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @WhitePath()
  @ApiOperation({ summary: '登陆' })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @WhitePath()
  @Post('refresh')
  @ApiOperation({ summary: '刷新token' })
  refreshToken(
    @Body() params: RefreshTokenDto,
    @GetToken() authorizationToken: string,
  ) {
    const { refreshToken } = params;
    return this.userService.refreshToken(refreshToken, authorizationToken);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('userInfo')
  findAll(@Profile() profile: IUserInfo) {
    return new BaseResponse('获取成功', profile);
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户信息' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

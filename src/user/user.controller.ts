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
import { LoginUserDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';
import { WhitePath } from '../decorators/whitePath';
import { Profile } from '../decorators/profile';
import { IUserInfo } from '../types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
    /** */
  }

  @WhitePath()
  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @WhitePath()
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.userService.loginUser(loginUserDto);
  }

  @ApiOperation({ summary: '获取用户信息' })
  @Get('userInfo')
  findAll(@Profile() profile: IUserInfo) {
    return profile;
  }

  @ApiOperation({ summary: '更新用户信息' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

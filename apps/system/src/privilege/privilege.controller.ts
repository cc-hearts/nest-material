import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PrivilegeService } from './privilege.service';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SearchPrivilegeDto } from './dto/search-privilege.dto';

@ApiTags('权限模块')
@Controller('privilege')
export class PrivilegeController {
  constructor(private readonly privilegeService: PrivilegeService) {}

  @ApiOperation({ summary: '创建权限' })
  @Post()
  create(@Body() createPrivilegeDto: CreatePrivilegeDto) {
    return this.privilegeService.create(createPrivilegeDto);
  }

  @ApiOperation({ summary: '获取权限列表' })
  @Get('list')
  findAll(@Query() searchPrivilegeDto: SearchPrivilegeDto) {
    return this.privilegeService.findAll(searchPrivilegeDto);
  }

  @ApiOperation({ summary: '更新权限信息' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePrivilegeDto: UpdatePrivilegeDto,
  ) {
    return this.privilegeService.update(+id, updatePrivilegeDto);
  }

  @ApiOperation({ summary: '删除权限' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.privilegeService.remove(+id);
  }
}

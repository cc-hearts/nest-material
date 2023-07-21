import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { FindRoleDto } from "./dto/find-role.dto";

@ApiTags("角色模块")
@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {
  }

  @Post()
  @ApiOperation({ summary: "创建角色" })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: "角色信息" })
  @Get("info/:id")
  findOne(@Param("id") id: string) {
    console.log("角色信息", id);
    return this.roleService.findOne(+id);
  }

  @Get("list")
  @ApiOperation({ summary: "查找角色列表" })
  fineAll(@Query() findRoleList: FindRoleDto) {
    console.log(findRoleList);
    return this.roleService.findAll(findRoleList);
  }

  @ApiOperation({ summary: "更新角色信息" })
  @Patch("update/:id")
  update(@Param("id") id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(+id, updateRoleDto);
  }

  @Delete("delete/:id")
  remove(@Param("id") id: string) {
    return this.roleService.remove(+id);
  }
}

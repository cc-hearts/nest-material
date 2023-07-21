import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { Repository } from "typeorm";
import { Role } from "./entities/role.entity";
import { ROLE_PROVIDER } from "./providers/role.provider";
import { BaseResponse } from "../utils/baseResponse";
import { FindRoleDto } from "./dto/find-role.dto";
import { sumSkip } from "../utils/pagination/caclPagination.uitil";
import { ServerErrorException } from "../exception/serverError.exception";
import { filterFieldFalsy } from "../utils/filter";

@Injectable()
export class RoleService {
  constructor(
    @Inject(ROLE_PROVIDER)
    private readonly roleRepository: Repository<Role>
  ) {
  }

  async create(createRoleDto: CreateRoleDto) {
    await this.roleRepository.save(createRoleDto);
    return new BaseResponse("新增角色成功");
  }

  async findAll(findRoleListDto: FindRoleDto) {
    const [dataSource, total] = await this.roleRepository
      .createQueryBuilder()
      .select()
      .skip(sumSkip(findRoleListDto))
      .take(findRoleListDto.pageSize)
      .getManyAndCount();

    return new BaseResponse("获取列表成功", {
      dataSource,
      total
    });
  }

  async findOne(id: number) {
    const data = await this.roleRepository.findOne({
      where: {
        id
      }
    });
    if (!data) {
      throw new HttpException("角色信息有误", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return new BaseResponse("查询角色信息成功", data);
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const entity = await this.roleRepository.findOne({
      where: { id }
    });
    if (!entity) {
      throw new ServerErrorException("角色不存在");
    }
    updateRoleDto = filterFieldFalsy(updateRoleDto);
    await this.roleRepository.update(id, updateRoleDto);
    return new BaseResponse("更新角色信息成功");
  }

  async remove(id: number) {
    const { affected } = await this.roleRepository.delete(id);
    if (affected) {
      return new BaseResponse("删除角色成功");
    }
    throw new ServerErrorException("删除角色失败");
  }
}

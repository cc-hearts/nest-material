import { Inject, Injectable } from '@nestjs/common';
import { CreateRolePrivilegeDto } from './dto/create-role-privilege.dto';
import { ROLE_PRIVILEGE_PROVIDER } from './providers/role-privilege.provider';
import { Repository } from 'typeorm';
import { RolePrivilege } from './entities/role-privilege.entity';
import { RoleService } from '../role/role.service';
import { PrivilegeService } from '../privilege/privilege.service';
import { ServerErrorException } from '../../../../libs/exception/serviceError.exception';
import { BaseResponse } from '../../../../libs/utils/baseResponse';

@Injectable()
export class RolePrivilegeService {
  constructor(
    @Inject(ROLE_PRIVILEGE_PROVIDER)
    private readonly rolePrivilegeRepository: Repository<RolePrivilege>,
    private readonly roleService: RoleService,
    private readonly privilegeService: PrivilegeService,
  ) {}

  async create(createRolePrivilegeDto: CreateRolePrivilegeDto) {
    const { rid, pid } = createRolePrivilegeDto;
    const [isExistsRole, isExistsPrivilege] = await Promise.all([
      this.roleService.getEntityOrNull(+rid),
      this.privilegeService.getEntityOrNull(+pid),
    ]);
    if (!isExistsRole) throw new ServerErrorException('用户数据不存在');
    if (!isExistsPrivilege) throw new ServerErrorException('权限数据不存在');

    const entity = { rid: +rid, pid: +pid };
    if (
      await this.rolePrivilegeRepository.findOne({
        where: entity,
      })
    ) {
      throw new ServerErrorException('角色权限关联已存在');
    }

    await this.rolePrivilegeRepository.save(entity);
    return new BaseResponse('角色权限关系新增成功');
  }

  async getPrivilegeListByRid(rid: number) {
    const res = await this.rolePrivilegeRepository
      .createQueryBuilder()
      .where('rid = :rid', { rid })
      .execute();

    return new BaseResponse('获取权限列表成功', res);
  }

  async getRoleListByPid(pid: number) {
    const res = await this.rolePrivilegeRepository
      .createQueryBuilder()
      .where('pid = :pid', { pid })
      .execute();
    return new BaseResponse('获取角色列表成功', res);
  }

  async removePrivilegeListByRid(rid: number) {
    const { affected } = await this.rolePrivilegeRepository
      .createQueryBuilder()
      .delete()
      .where('rid = :rid', { rid })
      .execute();
    return new BaseResponse(`移除 权限数据为：${affected}`);
  }

  async removeRoleListByPid(pid: number) {
    const { affected } = await this.rolePrivilegeRepository
      .createQueryBuilder()
      .delete()
      .where('pid = :pid', { pid })
      .execute();
    return new BaseResponse(`移除角色数据为：${affected}`);
  }
}

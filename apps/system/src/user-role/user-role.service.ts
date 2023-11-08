import { Inject, Injectable } from '@nestjs/common';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { USER_ROLE_PROVIDER } from './providers/user-role.provider';
import { Repository } from 'typeorm';
import { UserRole } from './entities/user-role.entity';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { ServerErrorException } from '../../../../libs/exception/serviceError.exception';
import { BaseResponse } from '../../../../libs/utils/baseResponse';
import { RemoveUserRoleRelativeDto } from './dto/remove-user-role.dto';
import { isNull } from '@cc-heart/utils';

@Injectable()
export class UserRoleService {
  constructor(
    @Inject(USER_ROLE_PROVIDER)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  async create(createUserRoleDto: CreateUserRoleDto) {
    const { uid, rid } = createUserRoleDto;
    const [isExistUser, isExistRole] = await Promise.all([
      this.userService.getEntityOrNull(+uid),
      this.roleService.getEntityOrNull(+rid),
    ]);

    if (isExistUser) {
      throw new ServerErrorException('用户不存在');
    }
    if (isExistRole) throw new ServerErrorException('角色不存在');
    const entity = { uid: +uid, rid: +rid };
    if (
      await this.userRoleRepository.findOne({
        where: entity,
      })
    ) {
      throw new ServerErrorException('已存在关联');
    }
    await this.userRoleRepository.save(entity);
    return new BaseResponse('成功新增用户角色关联关系');
  }

  getRoleListByUid(uid: number) {
    return this.userRoleRepository.find({
      where: { uid },
    });
  }

  getUserListByRid(rid: number) {
    return this.userRoleRepository.find({
      where: { rid },
    });
  }

  async removeUserListByRid(rid: number) {
    const { affected } = await this.userRoleRepository
      .createQueryBuilder()
      .delete()
      .where('rid = :rid', { rid })
      .execute();

    if (affected) {
      return new BaseResponse(`删除成功， 共删除了${affected}条用户数据`);
    }
    return null;
  }

  async removeRoleListByUid(uid: number) {
    const { affected } = await this.userRoleRepository
      .createQueryBuilder()
      .delete()
      .where('uid = :uid', { uid })
      .execute();

    if (affected) {
      return new BaseResponse(`删除成功， 共删除了${affected}条角色数据`);
    }
    return null;
  }

  async removeUserRoleRelative(
    removeUserRoleRelativeDto: RemoveUserRoleRelativeDto,
  ) {
    const { uid, rid } = removeUserRoleRelativeDto;

    const res = await this.userRoleRepository.findOne({
      where: { uid: +uid, rid: +rid },
    });

    if (isNull(res)) throw new ServerErrorException('角色id或用户id信息错误');

    await this.userRoleRepository
      .createQueryBuilder()
      .delete()
      .where('uid = :uid, rid = :rid', { uid, rid })
      .execute();
    return new BaseResponse('删除角色用户关联数据成功');
  }
}

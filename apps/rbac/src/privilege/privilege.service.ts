import { Inject, Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';
import { Repository } from 'typeorm';
import { Privilege } from './entities/privilege.entity';
import { BaseResponse } from '../../../../libs/utils/baseResponse';
import { SearchPrivilegeDto } from './dto/search-privilege.dto';
import { sumSkip } from '../../../../libs/utils/pagination/calcPagination.util';
import { PRIVILEGE_PROVIDER } from './providers/privilege.provider';
import { getEntityOrNullById } from '../../../../libs/utils/repository/getEntityOrNullById';
import { filterFieldFalsy } from '../../../../libs/utils/filter';
import { ServerErrorException } from '../../../../libs/exception/serviceError.exception';

@Injectable()
export class PrivilegeService {
  constructor(
    @Inject(PRIVILEGE_PROVIDER)
    private readonly privilegeRepository: Repository<Privilege>,
  ) {}
  async create(createPrivilegeDto: CreatePrivilegeDto) {
    await this.privilegeRepository.save(createPrivilegeDto);
    return new BaseResponse('创建成功');
  }

  async findAll(searchPrivilegeDto: SearchPrivilegeDto) {
    const [dataSource, total] = await this.privilegeRepository
      .createQueryBuilder()
      .select()
      .skip(sumSkip(searchPrivilegeDto))
      .take(searchPrivilegeDto.pageSize)
      .execute();

    return new BaseResponse('查询成功', {
      dataSource,
      total,
    });
  }

  getEntityOrNull(id: number) {
    return getEntityOrNullById(id, this.privilegeRepository);
  }

  async isExistsPrivilege(id: number) {
    const entity = await getEntityOrNullById(id, this.privilegeRepository);
    if (!entity) throw new ServerErrorException('权限不存在');
    return true;
  }

  async update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    await this.isExistsPrivilege(id);
    updatePrivilegeDto = filterFieldFalsy(updatePrivilegeDto);
    const { affected } = await this.privilegeRepository.update(
      id,
      updatePrivilegeDto,
    );
    if (affected) return new BaseResponse('修改权限成功');
    throw new ServerErrorException(`权限更新失败`);
  }

  async remove(id: number) {
    await this.isExistsPrivilege(id);
    await this.privilegeRepository.delete(id);
    return new BaseResponse('权限删除成功');
  }
}

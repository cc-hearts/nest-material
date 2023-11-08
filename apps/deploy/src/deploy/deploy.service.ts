import { Inject, Injectable } from '@nestjs/common';
import { CreateDeployDto } from './dto/create-deploy.dto';
import { UpdateDeployDto } from './dto/update-deploy.dto';
import { BasePaginationDto } from '../../../../libs/dto/basePagination.dto';
import { Repository } from 'typeorm';
import { Deploy } from './entities/deploy.entity';
import { DEPLOY_PROVIDER } from './providers/deploy.provider';
import { sumSkip } from '../../../../libs/utils/pagination/calcPagination.util';
import { BaseResponse } from '../../../../libs/utils/baseResponse';

@Injectable()
export class DeployService {
  constructor(
    @Inject(DEPLOY_PROVIDER)
    private readonly deployRepository: Repository<Deploy>,
  ) {}

  create(createDeployDto: CreateDeployDto) {
    return 'This action adds a new deploy';
  }

  async findAll(pagination: BasePaginationDto) {
    const [dataSource, total] = await this.deployRepository
      .createQueryBuilder()
      .select()
      .skip(sumSkip(pagination))
      .take(pagination.pageSize)
      .getManyAndCount();
    return new BaseResponse('获取数据成功', { dataSource, total });
  }

  findOne(id: number) {
    return `This action returns a #${id} deploy`;
  }

  update(id: number, updateDeployDto: UpdateDeployDto) {
    return `This action updates a #${id} deploy`;
  }

  remove(id: number) {
    return `This action removes a #${id} deploy`;
  }
}

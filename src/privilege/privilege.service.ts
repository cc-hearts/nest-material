import { Injectable } from '@nestjs/common';
import { CreatePrivilegeDto } from './dto/create-privilege.dto';
import { UpdatePrivilegeDto } from './dto/update-privilege.dto';

@Injectable()
export class PrivilegeService {
  create(createPrivilegeDto: CreatePrivilegeDto) {
    return 'This action adds a new privilege';
  }

  findAll() {
    return `This action returns all privilege`;
  }

  findOne(id: number) {
    return `This action returns a #${id} privilege`;
  }

  update(id: number, updatePrivilegeDto: UpdatePrivilegeDto) {
    return `This action updates a #${id} privilege`;
  }

  remove(id: number) {
    return `This action removes a #${id} privilege`;
  }
}

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { USER_PROVIDER, USER_STATUS } from './constants/user.constants';
import { encodeMd5 } from '../utils/crypto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from '../utils/baseResponse';
import { filterFieldFalsy } from '../utils/filter';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_PROVIDER) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const { username, password, mobile } = dto;
    const name = username; // 取默认值
    const data = await this.userRepository.save({
      name,
      username,
      password: encodeMd5(password),
      mobile,
    });
    Logger.log('crete user info:', data);
    return '请求成功';
  }

  async loginUser(user: LoginUserDto) {
    const { username, password } = user;
    const data = await this.userRepository
      .createQueryBuilder()
      .where('username = :username OR mobile = :username', { username })
      .getOne();

    if (!data) {
      throw new HttpException('用户不存在', HttpStatus.BAD_REQUEST);
    }
    if (data.status === USER_STATUS.DISABLED) {
      throw new HttpException('用户已冻结', HttpStatus.BAD_REQUEST);
    }
    if (data.password !== encodeMd5(password)) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    const payload = { uid: data.id, name: data.name, username: data.username };
    const accessToken = await this.jwtService.signAsync(payload);
    return new BaseResponse('登陆成功', { accessToken });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, name } = updateUserDto;
    const updateEntity = filterFieldFalsy({ email, name });
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set(updateEntity)
      .where('id = :id', { id })
      .execute();
    return new BaseResponse('更新成功');
  }

  async remove(id: number) {
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ status: USER_STATUS.DISABLED })
      .where('id =:id', { id })
      .execute();
    return new BaseResponse('用户冻结成功');
  }
}

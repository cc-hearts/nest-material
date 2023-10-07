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
import {decodeAes, encodeAes, encodeMd5} from '../../../../libs/utils/crypto';
import { LoginUserDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { BaseResponse } from '../../../../libs/utils/baseResponse';
import { filterFieldFalsy } from '../../../../libs/utils/filter';
import { getEntityOrNullById } from '../../../../libs/utils/repository/getEntityOrNullById';
import { getConfig } from '../../../../libs/utils/env';
import { randomUUID } from 'crypto';
import { ServerErrorException } from '../../../../libs/exception/serviceError.exception';

interface IPayload {
  id: number;
  plain: string;
}

@Injectable()
export class UserService {
  private readonly defaultRefreshTokenExpire = '7d';
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

    if (data.password !== password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }
    return new BaseResponse('登陆成功', await this.genSignaturesToken(data));
  }

  async genSignaturesToken(data: {
    id: number;
    name: string;
    username: string;
  }) {
    const payload = {
      uid: data.id,
      name: data.name,
      username: data.username,
    };
    const plain = randomUUID();
    const { refresh_expiresIn } = await getConfig();
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign({ ...payload, plain }),
      this.jwtService.sign(payload, {
        expiresIn: refresh_expiresIn || this.defaultRefreshTokenExpire,
        secret: encodeAes(plain),
      }),
    ]);
    return { accessToken, refreshToken };
  }

  getEntityOrNull(id: number) {
    return getEntityOrNullById(id, this.userRepository);
  }

  async refreshToken(refreshToken: string, authorizationToken: string) {
    const { id, plain } = this.jwtService.decode(
      authorizationToken,
    ) as IPayload;
    if (!plain) throw new ServerErrorException(`verify refreshToken error`);
    await this.jwtService.verify(refreshToken, {
      secret: encodeAes(plain),
    });
    const profile = await this.getEntityOrNull(id);
    if (!profile) new ServerErrorException(`刷新失败： 用户id: ${id} 不存在`);
    return new BaseResponse('刷新成功', await this.genSignaturesToken(profile));
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

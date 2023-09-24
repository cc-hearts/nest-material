import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty({
    example: 'admin',
    description: '用户名',
  })
  username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '123456',
    description: '登陆密码',
  })
  password: string;

  @IsNotEmpty()
  @IsMobilePhone('zh-CN')
  @ApiProperty({
    example: '15777991133',
    description: '手机号码',
  })
  mobile: string;
}

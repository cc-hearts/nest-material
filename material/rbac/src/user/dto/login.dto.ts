import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsNotEmpty()
  @ApiProperty({ example: 'heart', description: '用户名' })
  username: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: '密码' })
  password: string;
}

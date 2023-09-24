import { IsEnum, IsNotEmpty } from 'class-validator';
import { PRIVILEGE_STATUS } from '../entities/privilege.entity';
import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreatePrivilegeDto {
  @IsNotEmpty()
  @ApiProperty({ description: '权限名称' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: '权限code' })
  code: string;

  @ApiProperty({ description: '状态' })
  @Optional()
  @Transform((option) => {
    const value = Number(option.value);
    option.obj[option.key] = value;
    return value;
  })
  @IsEnum(PRIVILEGE_STATUS)
  status: PRIVILEGE_STATUS;
}

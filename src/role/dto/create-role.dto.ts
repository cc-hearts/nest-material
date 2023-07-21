import { IsNotEmpty, IsString, IsOptional, IsEnum } from "class-validator";
import { ROLE } from "../constants";
import { Transform } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({ example: "admin", description: "角色名称" })
  name: string;

  @ApiProperty({ example: 0, description: "角色编码" })
  @IsNotEmpty()
  @IsEnum(ROLE)
  @Transform((option) => {
    const value = Number(option.value);
    option.obj[option.key] = value;
    return value;
  })
  code: ROLE;

  @ApiProperty({ example: "描述", description: "角色描述" })
  @IsOptional()
  @IsString()
  description: string;
}

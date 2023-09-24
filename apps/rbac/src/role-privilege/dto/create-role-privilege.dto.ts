import { IsNotEmpty } from 'class-validator';

export class CreateRolePrivilegeDto {
  @IsNotEmpty()
  rid: string | number;

  @IsNotEmpty()
  pid: string | number;
}

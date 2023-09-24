import { PartialType } from '@nestjs/swagger';
import { CreateRolePrivilegeDto } from './create-role-privilege.dto';

export class UpdateRolePrivilegeDto extends PartialType(
  CreateRolePrivilegeDto,
) {}

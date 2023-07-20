import { PartialType } from '@nestjs/swagger';
import { CreatePrivilegeDto } from './create-privilege.dto';

export class UpdatePrivilegeDto extends PartialType(CreatePrivilegeDto) {}

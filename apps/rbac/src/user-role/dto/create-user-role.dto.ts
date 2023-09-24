import { IsNotEmpty } from 'class-validator';

export class CreateUserRoleDto {
  @IsNotEmpty()
  uid: string | number;

  @IsNotEmpty()
  rid: string | number;
}

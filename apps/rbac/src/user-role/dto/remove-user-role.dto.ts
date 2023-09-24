import { IsNotEmpty } from 'class-validator';

export class RemoveUserRoleRelativeDto {
  @IsNotEmpty()
  uid: string;

  @IsNotEmpty()
  rid: string;
}

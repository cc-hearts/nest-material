import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { MENU_TYPE } from '../constant';

export class CreateMenuDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  @IsEnum(MENU_TYPE)
  type: MENU_TYPE;

  @IsOptional()
  pid: number;

  @IsOptional()
  path?: string;

  @IsOptional()
  components: string;

  @IsNotEmpty()
  sort: number;
}

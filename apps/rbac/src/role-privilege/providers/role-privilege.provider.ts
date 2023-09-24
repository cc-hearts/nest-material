import { ProviderFactory } from '../../../../../libs/utils/provider.factory';
import { RolePrivilege } from '../entities/role-privilege.entity';

export const ROLE_PRIVILEGE_PROVIDER = 'ROLE_PRIVILEGE_PROVIDER';
export const RolePrivilegeProvider = ProviderFactory(
  ROLE_PRIVILEGE_PROVIDER,
  RolePrivilege,
);

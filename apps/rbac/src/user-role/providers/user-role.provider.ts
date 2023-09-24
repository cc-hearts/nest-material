import { ProviderFactory } from '../../../../../libs/utils/provider.factory';
import { UserRole } from '../entities/user-role.entity';

export const USER_ROLE_PROVIDER = 'USER_ROLE_PROVIDER';
export const UserRoleProvider = ProviderFactory(USER_ROLE_PROVIDER, UserRole);

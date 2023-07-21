import { ProviderFactory } from '../../utils/provider.factory';
import { Privilege } from '../entities/privilege.entity';

export const PRIVILEGE_PROVIDER = 'PRIVILEGE_PROVIDER';
export const PrivilegeProvider = ProviderFactory(PRIVILEGE_PROVIDER, Privilege);

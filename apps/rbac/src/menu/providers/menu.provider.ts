import { ProviderFactory } from '../../../../../libs/utils/provider.factory';
import { Menu } from '../entities/menu.entity';

export const MENU_PROVIDER = 'MENU_PROVIDER';
export const MenuProvider = ProviderFactory(MENU_PROVIDER, Menu);

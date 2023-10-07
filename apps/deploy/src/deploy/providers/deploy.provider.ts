import { ProviderFactory } from '../../../../../libs/utils/provider.factory';
import { Deploy } from '../entities/deploy.entity';

export const DEPLOY_PROVIDER = 'DEPLOY_PROVIDER';
export const DeployProvider = ProviderFactory(DEPLOY_PROVIDER, Deploy);

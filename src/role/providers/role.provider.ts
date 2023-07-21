import { ProviderFactory } from "../../utils/provider.factory";
import { Role } from "../entities/role.entity";

export const ROLE_PROVIDER = "ROLE_PROVIDER";
export const RoleProvider = ProviderFactory(ROLE_PROVIDER, Role);

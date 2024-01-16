import { TenantSettingsType } from 'core.v2/domain/@shared/types/tenant-settings.type';

export interface TenantSettingsMapperInterface {
  toDomain(tenantSettingsDTO: any): TenantSettingsType;
}

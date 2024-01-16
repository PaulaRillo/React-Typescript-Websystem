import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import { TenantSettingsType } from 'core.v2/domain/@shared/types/tenant-settings.type';
import { SyncStateOutput } from './../../mappers/tenant/tenant-sync-status-mapper';
export interface TenantGatewayInterface {
  getQuotas(): Promise<any>;
  getSettings(): Promise<TenantSettingsType>;
  getCashFlows(): Promise<CashFlowType[]>;
  getSyncStatus(): Promise<SyncStateOutput>;
}

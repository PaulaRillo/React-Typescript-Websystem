import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import { TenantSettingsType } from '../../../domain/@shared/types/tenant-settings.type';

export interface TenantControllerInterface {
  getQuotas(): Promise<any>;
  getSettings(): Promise<TenantSettingsType>;
  getCashFlows(): Promise<CashFlowType[]>;
  getSyncStatus(): Promise<SyncStateOutput>;
}

import { SyncStatusEnum } from 'core/domain/connection/SyncStatusEnum';

export type SyncStateType = {
  lastSyncAt: string;
  failedAt: string;
  startedAt: string;
  syncStatus: SyncStatusEnum;
  totalInvoices?: number;
  totalInvoicesToSync?: number;
};

export type TenantSyncStatusType = {
  name: string;
  position: number;
  sync: {
    current: SyncStateType;
    prev: SyncStateType;
  };
};

export type GlobalSyncStateType = {
  syncStatus: SyncStatusEnum;
  currentStepName?: string;
  currentStepPosition?: number;
  startedAt?: string;
  failedAt?: string;
  lastSyncAt?: string;
};

export type SyncStateOutput = {
  globalState: GlobalSyncStateType;
  steps: TenantSyncStatusType[];
};

export class TenantSyncStatusMapper {
  StepsRawToDomain(input: any): TenantSyncStatusType {
    return {
      name: input?.name?.toString(),
      position: input?.position?.toString(),
      sync: {
        current: {
          syncStatus: input?.sync.current?.sync_status?.toString(),
          startedAt: input?.sync.current?.started_at?.toString(),
          lastSyncAt: input?.sync.current?.last_sync_at?.toString(),
          failedAt: input?.sync.current?.failed_at?.toString(),
          totalInvoices: input?.sync.current?.total_invoices?.toString() || undefined, //prettier-ignore
          totalInvoicesToSync: input?.sync.current?.total_invoices_to_sync?.toString() || undefined //prettier-ignore
        },
        prev: {
          syncStatus: input?.sync.prev?.sync_status?.toString(),
          startedAt: input?.sync.prev?.started_at?.toString(),
          lastSyncAt: input?.sync.prev?.last_sync_at?.toString(),
          failedAt: input?.sync.prev?.failed_at?.toString(),
          totalInvoices: input?.sync.prev?.total_invoices?.toString() || undefined, //prettier-ignore
          totalInvoicesToSync: input?.sync.prev?.total_invoices_to_sync?.toString() || undefined //prettier-ignore
        }
      }
    };
  }

  GlobalStateToDomain(input: any): GlobalSyncStateType {
    return {
      syncStatus: input?.sync_status?.toString(),
      currentStepName: input?.current_step_name?.toString(),
      currentStepPosition: Number(input?.current_step_position || '0'),
      startedAt: input?.started_at?.toString(),
      failedAt: input?.failed_at?.toString(),
      lastSyncAt: input?.last_sync_at?.toString()
    };
  }
}

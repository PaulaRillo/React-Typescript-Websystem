import { StatusEnum } from './StatusEnum';
import { SyncStatusEnum } from './SyncStatusEnum';

export type ConnectionStatusInput = {
  accounting_software: string | null;
  last_sync_at: string | null;
  status: StatusEnum;
  sync_status: SyncStatusEnum;
};

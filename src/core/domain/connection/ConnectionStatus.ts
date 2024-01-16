import { ConnectionStatusInput } from './ConnectionStatusInput';
import { StatusEnum } from './StatusEnum';
import { SyncStatusEnum } from './SyncStatusEnum';

export class ConnectionStatus {
  public readonly accountingSoftware: string | null;
  public readonly lastSyncAt: string | null;
  public readonly status: StatusEnum;
  public readonly syncStatus: SyncStatusEnum;

  constructor(input: ConnectionStatusInput) {
    this.accountingSoftware = input.accounting_software;
    this.lastSyncAt = input.last_sync_at;
    this.status = input.status;
    this.syncStatus = input.sync_status;
  }
}

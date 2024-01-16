import { ConnectionDetailsInput } from './ConnectionDetailsInput';
import { StatusEnum } from './StatusEnum';

export class ConnectionDetails {
  private readonly _status: StatusEnum;
  private readonly _accounting_software?: string | null;
  private readonly _last_sync_at?: string | null;
  private readonly _username?: string;
  private readonly _erp_name?: string;
  private readonly _database_name?: string;
  private readonly _api_endpoint?: string;

  constructor(input: ConnectionDetailsInput) {
    this._status = input.status;
    this._accounting_software = input.accounting_software;
    this._last_sync_at = input.last_sync_at;
    this._username = input?.username;
    this._erp_name = input?.erp_name;
    this._database_name = input?.database_name;
    this._api_endpoint = input?.api_endpoint;
  }

  get status() {
    return this._status;
  }
  get accountingSoftware() {
    return this._accounting_software;
  }
  get lastSyncAt() {
    return this._last_sync_at;
  }
  get username() {
    return this._username;
  }
  get erpName() {
    return this._erp_name;
  }
  get databaseName() {
    return this._database_name;
  }
  get apiEndpoint() {
    return this._api_endpoint;
  }
}

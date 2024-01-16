import { IHttpClient } from './../../../../domain/infra/httpClient/IHttpClient';
import { SyncSapErpOutputDTO } from './SyncSapErpOutputDTO';

export class SyncSapErp {
  private readonly _httpClient: IHttpClient;
  private _erpSyncPullEndpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._erpSyncPullEndpoint = `/erp-sync/pull`;
  }

  async execute(): Promise<SyncSapErpOutputDTO> {
    return await this._httpClient.post(this._erpSyncPullEndpoint);
  }
}

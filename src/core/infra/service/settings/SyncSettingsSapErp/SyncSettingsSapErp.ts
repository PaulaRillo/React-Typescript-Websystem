import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';

export class SyncSettingsSapErp {
  private readonly _httpClient: IHttpClient;
  private _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/settings/pull`;
  }

  async execute(): Promise<void> {
    return await this._httpClient.post(this._endpoint);
  }
}

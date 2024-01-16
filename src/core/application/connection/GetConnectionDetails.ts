import { IHttpClient } from '../../../core/domain/infra/httpClient/IHttpClient';
import { ConnectionDetails } from '../../domain/connection/ConnectionDetails';

export class GetConnectionDetails {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/settings/erp/connection-details`;
  }

  async execute(): Promise<ConnectionDetails> {
    const input = await this._httpClient.get<any>(this._endpoint);
    return new ConnectionDetails(input);
  }
}

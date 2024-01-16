import { ConnectionStatusInput } from 'core/domain/connection/ConnectionStatusInput';
import { IHttpClient } from '../../../core/domain/infra/httpClient/IHttpClient';
import { ConnectionStatus } from '../../domain/connection/ConnectionStatus';

export class GetConnectionStatus {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/settings/erp/connection-status`;
  }

  async execute(): Promise<ConnectionStatus> {
    const input = await this._httpClient.get<ConnectionStatusInput>(
      this._endpoint
    );
    return new ConnectionStatus(input);
  }
}

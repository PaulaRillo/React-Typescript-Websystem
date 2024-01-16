import { IHttpClient } from '../../../domain/infra/httpClient/IHttpClient';

export class GetCashFlow {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/cash-flows`;
  }

  async execute(): Promise<any> {
    const response = await this._httpClient.get<any>(this._endpoint);
    return response;
  }
}

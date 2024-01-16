import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';

export class GetRoles {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/software/BILLTALLY/roles`;
  }

  async execute(): Promise<any> {
    const input = await this._httpClient.get<any>(this._endpoint);
    return input;
  }
}

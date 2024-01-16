import { IHttpClient } from 'core/domain/infra/httpClient/IHttpClient';

export class GetAuthorizations {
  private readonly _httpClient: IHttpClient;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
  }

  async execute(userId: string): Promise<any> {
    const endpoint = `/users/${userId}/software/BILLTALLY/authorizations`;
    const input = await this._httpClient.get(endpoint);
    return input;
  }
}

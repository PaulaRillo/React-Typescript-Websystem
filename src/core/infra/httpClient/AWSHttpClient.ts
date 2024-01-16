import { API } from 'aws-amplify';
import { IHttpClient } from '../../domain/infra/httpClient/IHttpClient';

export class AWSHttpClient implements IHttpClient {
  private readonly _api: typeof API;
  private readonly _apiName: string;

  constructor(apiName: string) {
    this._api = API;
    this._apiName = apiName;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this._api.get(this._apiName, endpoint, {});
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this._api.post(this._apiName, endpoint, { body });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this._api.put(this._apiName, endpoint, { body });
  }

  async patch<T>(endpoint: string, body: any): Promise<T> {
    return this._api.patch(this._apiName, endpoint, { body });
  }
}

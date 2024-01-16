import { IHttpClient } from '../../../../domain/infra/httpClient/IHttpClient';
import { TestSapErpConnectionInputDTO } from './TestSapErpConnectionInputDTO';
import { TestSapErpConnectionOutputDTO } from './TestSapErpConnectionOutputDTO';

type Input = TestSapErpConnectionInputDTO;
type Output = TestSapErpConnectionOutputDTO;

export class TestSapErpConnection {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/settings/erp/sap/test-connection`;
  }

  async execute(input: Input): Promise<Output> {
    return await this._httpClient.post<Output>(this._endpoint, {
      host: input.host,
      credentials: input.credentials
    });
  }
}

import { IHttpClient } from './../../../../domain/infra/httpClient/IHttpClient';
import { ConnectSapErpInputDTO } from './ConnectSapErpInputDTO';
import { ConnectSapErpOutputDTO } from './ConnectSapErpOutputDTO';

export class ConnectSapErp {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;
  private readonly _erpName: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._erpName = `sap_b1`;
    this._endpoint = `/settings/erp/credentials`;
  }

  async execute(input: ConnectSapErpInputDTO): Promise<ConnectSapErpOutputDTO> {
    return await this._httpClient.post<ConnectSapErpOutputDTO>(this._endpoint, {
      erp_name: this._erpName,
      api_endpoint: input.host,
      database_name: input.dbname,
      username: input.username,
      password: input.password
    });
  }
}

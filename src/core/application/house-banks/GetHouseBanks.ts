import { IHttpClient } from '../../domain/infra/httpClient/IHttpClient';
import { TenantBankingInfo } from 'core/domain/company/TenantBankingInfo';
import { tenant_banking_info } from 'core/domain/company/tenant_banking_info';

export class GetHouseBanks {
  private readonly _httpClient: IHttpClient;
  private readonly _endpoint: string;

  constructor(httpClient: IHttpClient) {
    this._httpClient = httpClient;
    this._endpoint = `/house-bank-accounts`;
  }

  async execute(): Promise<TenantBankingInfo[]> {
    const input = await this._httpClient.get<tenant_banking_info[]>(
      this._endpoint
    );
    return input.map((bankingInfo) => new TenantBankingInfo(bankingInfo));
  }
}
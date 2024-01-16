import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { AwsApiName } from '../../../domain/@shared/settings/constants.enum';
import { CurrencyType } from '../../../domain/@shared/types/currency.type';
import { CurrencyMapperInterface } from '../../mappers/currency/currency-mapper.interface';
import { SetupGatewayInterface } from './setup-gateway.interface';

export class SetupGatewayHttp implements SetupGatewayInterface {
  private readonly httpClient: HttpClientInterface;
  private readonly currencyMapper: CurrencyMapperInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
    this.currencyMapper = this.mapperFactory.createCurrencyMapper();
  }

  async configureCurrency(currency: CurrencyType): Promise<any> {
    const endpoint = `/currencies/${encodeURIComponent(currency.id)}`;
    return await this.httpClient.patch<unknown[]>(endpoint, currency); //prettier-ignore;
  }

  async getCurrencies(): Promise<CurrencyType[]> {
    const endpoint = `/currencies`;
    const currenciesData = await this.httpClient.get<unknown[]>(endpoint);
    return currenciesData.map((currency) =>
      this.currencyMapper.toDomain(currency)
    );
  }

  async getTenantConfigurations(): Promise<any> {
    const endpoint = `/tenant/configurations`;
    const tenantConfigurations = await this.httpClient.get<any>(endpoint);
    return tenantConfigurations.all_currencies_configured;
  }

  async getConfiguredCurrencies(): Promise<CurrencyType[]> {
    const endpoint = `/currencies`;
    const currenciesData = await this.httpClient.get<unknown[]>(endpoint);
    const currencies = currenciesData.map((currency) =>
      this.currencyMapper.toDomain(currency)
    );
    return currencies.filter((currency: CurrencyType) => currency.isConfigured);
  }

  async getSystemManagedCurrencies(): Promise<CurrencyType[]> {
    const endpoint = `/system-managed-currencies`;
    const currenciesData = await this.httpClient.get<unknown[]>(endpoint);
    return currenciesData.map((currency) =>
      this.currencyMapper.toDomain(currency)
    );
  }
}

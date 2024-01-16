import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import type { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { AwsApiName } from '../../../domain/@shared/settings/constants.enum';
import type { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import type { VendorMapperInterface } from '../../mappers/vendor/vendor-mapper.interface';
import { ReportsGatewayInterface } from './reports-gateway.interface';

type VendorQueryInput = {
  startDate: string;
  endDate: string;
};
export class ReportsGatewayHttp implements ReportsGatewayInterface {
  private readonly endpoint: string;
  private readonly httpClient: HttpClientInterface;
  private readonly vendorMapper: VendorMapperInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
    this.vendorMapper = this.mapperFactory.createVendorMapper();
    this.endpoint = '/reports';
  }

  async vendorQuery(
    input: VendorQueryInput
  ): Promise<OutputListGatewayDTO<any>> {
    if (!input?.startDate || !input?.endDate)
      throw new Error('Missing required input parameters.');

    const response = await this.httpClient.get<any>(
      `${this.endpoint}/vendors?startDate=${input?.startDate}&endDate=${input?.endDate}`
    );

    return {
      data: response?.data,
      pagination: response.pagination,
      totalRecords: response.totalRecords
    };
  }
}

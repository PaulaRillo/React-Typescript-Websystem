import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Vendor } from 'core.v2/domain/vendor/entity/vendor';
import { VendorFactoryProps } from 'core.v2/domain/vendor/factory/vendor-factory.props';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import { AwsApiName } from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import type { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { VendorFactory } from '../../../domain/vendor/factory/vendor-factory';
import type { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import type { VendorMapperInterface } from '../../mappers/vendor/vendor-mapper.interface';
import type {
  InputQuery,
  VendorGatewayInterface
} from './vendor-gateway.interface';

export class VendorGatewayHttp implements VendorGatewayInterface {
  private readonly endpoint: string;
  private readonly httpClient: HttpClientInterface;
  private readonly vendorsMapper: VendorMapperInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
    this.vendorsMapper = this.mapperFactory.createVendorMapper();
    this.endpoint = '/vendors';
  }

  async query(query: InputQuery): Promise<OutputListGatewayDTO<Vendor>> {
    const queryGenerator = (query: InputQuery) => {
      const queryArray = [];
      queryArray.push(`skip=${query.skip || 0}`);
      queryArray.push(`take=${query.take || 20}`);
      if (query.visualId) {
        queryArray.push(`visualId=${query.visualId}`);
      }
      if (query.externalId) {
        queryArray.push(`externalId=${query.externalId}`);
      }
      if (query.name) {
        queryArray.push(`name=${query.name}`);
      }
      if (query.sortColumn) {
        queryArray.push(`sortColumn=${query.sortColumn}`);
      }
      if (query.sortDirection) {
        queryArray.push(`sortDirection=${query.sortDirection}`);
      }
      return queryArray.join('&');
    };

    const response = await this.httpClient.get<any>(
      `${this.endpoint}?${queryGenerator(query)}`
    );

    const vendorMappedList = response?.data?.map((invoice: any) => {
      return this.vendorsMapper.toDomain(invoice);
    });

    const vendorList = vendorMappedList.map((vendor: VendorFactoryProps) => {
      return VendorFactory.create(vendor);
    });

    return {
      data: vendorList,
      pagination: response.pagination,
      totalRecords: response.totalRecords
    };
  }

  async find(vendorVisualId: string): Promise<Vendor> {
    const vendorData = await this.httpClient.get(
      `${this.endpoint}/${vendorVisualId}`
    );

    const mappedVendor = this.vendorsMapper.toDomain(vendorData);
    return VendorFactory.create(mappedVendor);
  }

  async list(skip = '0', take = '20') {
    const response = await this.httpClient.get<any>(
      `${this.endpoint}?take=${take}&skip=${skip}`
    );

    const vendorMappedList = response?.data?.map((invoice: any) => {
      return this.vendorsMapper.toDomain(invoice);
    });

    return {
      data: vendorMappedList,
      pagination: response.pagination,
      totalRecords: response.totalRecords
    };
  }
}

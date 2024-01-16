import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { InvoiceFactoryProps } from 'core.v2/domain/invoice/factory/invoice-factory.props';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import { AwsApiName } from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import type { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { InvoiceFactory } from '../../../domain/invoice/factory/invoice-factory';
import type {
  HistoryInputQuery,
  InputQuery,
  InvoiceGatewayInterface
} from '../../../domain/invoice/gateway/invoice-gateway.interface';
import type { InvoiceMapperInterface } from '../../mappers/invoice/invoice-mapper.interface';
import type { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import type { GatewayFactoryInterface } from '../gateway-factory.interface';
import type { TenantGatewayInterface } from '../tenant/tenant-gateway.interface';

type Output = OutputListGatewayDTO<Invoice>;
export class InvoiceGatewayHttp implements InvoiceGatewayInterface {
  private readonly endpoint: string;
  private readonly httpClient: HttpClientInterface;
  private readonly invoiceMapper: InvoiceMapperInterface;
  private readonly tenantGateway: TenantGatewayInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface,
    private readonly gatewayFactory: GatewayFactoryInterface
  ) {
    this.invoiceMapper = this.mapperFactory.createInvoiceMapper();
    this.tenantGateway = this.gatewayFactory.createTenantGateway();
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
    this.endpoint = '/ap-invoices';
  }

  async history(query: HistoryInputQuery): Promise<any> {
    if (!query?.invoiceId) throw new Error('You must specify an invoice id');
    if (!query?.year) throw new Error('You must specify a year');

    let path = '';
    path += `year=${query?.year}`;
    if (query?.month) path += `&month=${query?.month}`;
    if (query?.day) path += `&day=${query?.day}`;

    const rawData = await this.httpClient.get(
      `${this.endpoint}/${query?.invoiceId}/history?${path}`
    );

    const historyMapper = this.mapperFactory.createInvoiceHistoryMapper();
    return historyMapper.toDomain(rawData);
  }

  async query(query: InputQuery): Promise<OutputListGatewayDTO<Invoice>> {
    const queryGenerator = (query: InputQuery) => {
      const queryArray = [];
      queryArray.push(`skip=${query.skip || 0}`);
      queryArray.push(`take=${query.take || 20}`);
      if (query.vendorName) {
        queryArray.push(`vendorName=${query.vendorName}`);
      }
      if (query.vendorExternalId) {
        queryArray.push(`vendor=${query.vendorExternalId}`);
      }
      if (query.invoiceExternalId) {
        queryArray.push(`invoiceExternalId=${query.invoiceExternalId}`);
      }
      if (query.externalApInvoiceNumber) {
        queryArray.push(
          `externalApInvoiceNumber=${query.externalApInvoiceNumber}`
        );
      }
      if (query.referenceNumberExternal) {
        queryArray.push(
          `referenceNumberExternal=${query.referenceNumberExternal}`
        );
      }
      if (query.currencyId) {
        queryArray.push(`currencyId=${query.currencyId}`);
      }
      if (query.dueDateStart) {
        queryArray.push(`dueDateStart=${query.dueDateStart}`);
      }
      if (query.dueDateEnd) {
        queryArray.push(`dueDateEnd=${query.dueDateEnd}`);
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

    const settings = await this.tenantGateway.getSettings();

    const invoiceMappedList: InvoiceFactoryProps[] = response?.data?.map(
      (invoice: any) => this.invoiceMapper.toDomain(invoice)
    );

    const invoiceList = invoiceMappedList.map((invoice) => {
      return InvoiceFactory.create(invoice, settings);
    });

    return {
      data: invoiceList,
      pagination: response?.pagination,
      totalRecords: response?.totalRecords
    };
  }

  async find(invoiceId: string): Promise<Invoice> {
    const invoiceData = await this.httpClient.get(
      `${this.endpoint}/${invoiceId}`
    );

    const settings = await this.tenantGateway.getSettings();
    const invoiceMapped = this.invoiceMapper.toDomain(invoiceData);
    return InvoiceFactory.create(invoiceMapped, settings);
  }

  async list(skip = 0, take = 20): Promise<Output> {
    const response = await this.httpClient.get<any>(
      `${this.endpoint}?take=${take}&skip=${skip}`
    );

    const settings = await this.tenantGateway.getSettings();

    const invoiceMappedList: InvoiceFactoryProps[] = response?.data?.map(
      (invoice: any) => this.invoiceMapper.toDomain(invoice)
    );

    const invoiceList = invoiceMappedList.map((invoice) => {
      return InvoiceFactory.create(invoice, settings);
    });

    return {
      data: invoiceList,
      pagination: response?.pagination,
      totalRecords: response?.totalRecords
    };
  }

  async listByVendor(
    vendorId: string,
    skip?: number,
    take?: number
  ): Promise<Output> {
    const response = await this.httpClient.get<any>(
      `${this.endpoint}?vendor=${vendorId}&?take=${take}&skip=${skip}`
    );
    const settings = await this.tenantGateway.getSettings();
    const invoiceMappedList: InvoiceFactoryProps[] = response?.data?.map(
      (invoice: any) => this.invoiceMapper.toDomain(invoice)
    );
    const invoiceList = invoiceMappedList.map((invoice) => {
      return InvoiceFactory.create(invoice, settings);
    });

    return {
      data: invoiceList,
      pagination: response?.pagination,
      totalRecords: response?.totalRecords
    };
  }
}

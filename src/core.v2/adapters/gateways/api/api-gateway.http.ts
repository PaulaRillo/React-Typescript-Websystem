import { OpenApInvoiceDashboardRaw } from 'core.v2/adapters/mappers/dashboard/open-ap-invoice-mapper.interface';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import { AwsApiName } from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { OutgoingPaymentDashboardRaw } from './../../mappers/dashboard/outgoing-payment-mapper.interface';
import { ApiGatewayInterface } from './api-gateway.interface';
//prettier-ignore
export class ApiGatewayHttp implements ApiGatewayInterface {
  private readonly httpClient: HttpClientInterface;

  constructor(private readonly httpClientFactory: HttpClientFactoryInterface) {
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY);
  }

  async getDashboardOpenApInvoices(): Promise<OpenApInvoiceDashboardRaw> {
    const endpoint = `/dashboard/open-ap-invoices`;
    return await this.httpClient.get<OpenApInvoiceDashboardRaw>(endpoint);
  }

  async getDashboardOutgoingPayments(): Promise<OutgoingPaymentDashboardRaw> {
    const endpoint = `/dashboard/outgoing-payments`;
    return await this.httpClient.get<OutgoingPaymentDashboardRaw>(endpoint);
  }
}

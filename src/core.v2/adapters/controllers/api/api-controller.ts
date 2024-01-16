import { ApiGatewayInterface } from 'core.v2/adapters/gateways/api/api-gateway.interface';
import { GatewayFactoryInterface } from 'core.v2/adapters/gateways/gateway-factory.interface';
import { OpenApInvoiceDashboardMapper } from 'core.v2/adapters/mappers/dashboard/open-ap-invoice-mapper';
import { OutgoingPaymentMapper } from 'core.v2/adapters/mappers/dashboard/outgoing-payment-mapper';
import { OutgoingPaymentDashboardDomain } from 'core.v2/adapters/mappers/dashboard/outgoing-payment-mapper.interface';
import { ApiControllerInterface } from './api-controller.interface';

export class ApiController implements ApiControllerInterface {
  private readonly apiGateway: ApiGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.apiGateway = this.gatewayFactory.createApiGateway();
  }

  async getDashboardOpenApInvoices() {
    const data = await this.apiGateway.getDashboardOpenApInvoices();
    const mapper = new OpenApInvoiceDashboardMapper();
    return mapper.toDomain(data);
  }

  async getDashboardOutgoingPayments(): Promise<OutgoingPaymentDashboardDomain> {
    const data = await this.apiGateway.getDashboardOutgoingPayments();
    return OutgoingPaymentMapper.toDomain(data);
  }
}

import { PaymentLineGatewayInterface } from 'core.v2/adapters/gateways/payment/payment-line-gateway.interface';
import { OutputListGatewayDTO } from 'core.v2/domain/@shared/gateway/list-gateway.interface';
import { GatewayFactoryInterface } from '../../gateways/gateway-factory.interface';
import { PaymentLineControllerInterface } from './payment-line-controller.interface';

export class PaymentLineController implements PaymentLineControllerInterface {
  private readonly paymentLineGateway: PaymentLineGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.paymentLineGateway = this.gatewayFactory.createPaymentLineGateway();
  }

  async list(
    skip?: string,
    take?: string,
    vendor?: string,
    bill?: string
  ): Promise<ListOutput> {
    return await this.paymentLineGateway.list(skip, take, vendor, bill);
  }
}

type ListOutput = OutputListGatewayDTO<any>;

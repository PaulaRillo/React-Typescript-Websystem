import { PaymentGatewayInterface } from 'core.v2/adapters/gateways/payment/payment-gateway.interface';
import { SubmitPaymentRequestGroupUsecase } from 'core.v2/usecases/submit-payment-request-group-usecase';
import { GatewayFactoryInterface } from './../../gateways/gateway-factory.interface';
import { PaymentControllerInterface } from './payment-controller.interface';

export class PaymentController implements PaymentControllerInterface {
  private readonly paymentGateway: PaymentGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.paymentGateway = this.gatewayFactory.createPaymentGateway();
  }

  async submitPaymentRequestGroup(): Promise<void> {
    await new SubmitPaymentRequestGroupUsecase(this.gatewayFactory).execute();
  }
}

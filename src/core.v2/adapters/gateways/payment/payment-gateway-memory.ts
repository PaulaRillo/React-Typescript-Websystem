import { MapperFactoryInterface } from '../../../../../src/core.v2/adapters/mappers/mapper-factory.interface';
import { SubmitGroupPaymentRequestDTO } from './payment-gateway-dto';
import { PaymentGatewayInterface } from './payment-gateway.interface';

export class PaymentGatewayMemory implements PaymentGatewayInterface {
  constructor(private readonly mapperFactory: MapperFactoryInterface) {}

  async submitPaymentRequestGroup(input: SubmitGroupPaymentRequestDTO) {
    console.log('submitPaymentRequestGroup', input);
  }
}

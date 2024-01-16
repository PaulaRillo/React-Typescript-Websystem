import { MapperFactoryInterface } from '../../mappers/mapper-factory.interface';
import { PaymentLineGatewayInterface } from './payment-line-gateway.interface';

export class PaymentLineGatewayMemory implements PaymentLineGatewayInterface {
  constructor(private readonly mapperFactory: MapperFactoryInterface) { }

  async list(skip = '0', take = '20', vendor?: string, bill?: string) {
    console.log('list payment lines', {
      skip,
      take,
      vendor,
      bill
    });
  }
}

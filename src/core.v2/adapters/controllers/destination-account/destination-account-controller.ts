import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { DestinationAccountGatewayInterface } from 'core.v2/domain/destination-account/gateway/destination-account-gateway.interface';
import { GatewayFactoryInterface } from 'core.v2/adapters/gateways/gateway-factory.interface';
import { DestinationAccountControllerInterface } from './destination-account-controller.interface';

//prettier-ignore
export class DestinationAccountController implements DestinationAccountControllerInterface {
  private readonly destinationAccountGateway: DestinationAccountGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.destinationAccountGateway = this.gatewayFactory.createDestinationAccountGateway(); //prettier-ignore
  }

  async list(vendorId: string): Promise<DestinationAccountType[]> {
    return await this.destinationAccountGateway.list(vendorId);
  }
}

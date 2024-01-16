import { OriginAccountGatewayInterface } from 'core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { GatewayFactoryInterface } from 'core.v2/adapters/gateways/gateway-factory.interface';
import { OriginAccount } from '../../../domain/origin-account/entity/origin-account';
import { OriginAccountControllerInterface } from './origin-account-controller.interface';

//prettier-ignore
export class OriginAccountController implements OriginAccountControllerInterface {
  private readonly originAccountGateway: OriginAccountGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.originAccountGateway = this.gatewayFactory.createOriginAccountGateway(); //prettier-ignore
  }

  async list(): Promise<OriginAccount[]> {
    const originAccountList = await this.originAccountGateway.list();
    return JSON.parse(JSON.stringify(originAccountList));
  }
}

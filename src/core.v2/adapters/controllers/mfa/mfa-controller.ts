import type { GatewayFactoryInterface } from '../../gateways/gateway-factory.interface';
import type { MfaControllerInterface } from './mfa-controller.interface';
import { MfaGatewayInterface } from 'core.v2/adapters/gateways/mfa/mfa-gateway.interface';
import { MfaRequestDataType } from 'core.v2/domain/@shared/types/mfa.type';


export class MfaController implements MfaControllerInterface {
  private readonly mfaGateway: MfaGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.mfaGateway = this.gatewayFactory.createMfaGateway();
  }

  async sendMfa(data: MfaRequestDataType): Promise<any> {
    return await this.mfaGateway.sendMfa(data);
  }

  async validateMfa(data: MfaRequestDataType): Promise<any> {
    return await this.mfaGateway.validateMfa(data);
  }
}

import { MfaGatewayInterface } from './mfa-gateway.interface';
import { MfaRequestDataType } from 'core.v2/domain/@shared/types/mfa.type';

export class MfaGatewayMemory implements MfaGatewayInterface {
  async sendMfa(data: MfaRequestDataType): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async validateMfa(data: MfaRequestDataType): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

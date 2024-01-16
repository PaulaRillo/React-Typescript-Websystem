import { MfaRequestDataType } from 'core.v2/domain/@shared/types/mfa.type';
export interface MfaGatewayInterface {
  sendMfa(data: MfaRequestDataType): Promise<any>;
  validateMfa(data: MfaRequestDataType): Promise<any>;
}

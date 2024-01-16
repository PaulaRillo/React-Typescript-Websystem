import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';

export interface DestinationAccountGatewayInterface {
  list(vendorId: string): Promise<DestinationAccountType[]>;
}

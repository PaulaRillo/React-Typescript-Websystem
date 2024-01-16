import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';

export interface DestinationAccountControllerInterface {
  list(vendorId: string): Promise<DestinationAccountType[]>;
}

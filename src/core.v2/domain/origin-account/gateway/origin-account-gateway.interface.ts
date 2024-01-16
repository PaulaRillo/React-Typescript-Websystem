import { OriginAccount } from '../entity/origin-account';

export interface OriginAccountGatewayInterface {
  list(): Promise<OriginAccount[]>;
}

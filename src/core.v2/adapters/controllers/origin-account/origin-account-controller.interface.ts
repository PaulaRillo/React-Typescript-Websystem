import { OriginAccount } from '../../../domain/origin-account/entity/origin-account';

export interface OriginAccountControllerInterface {
  list(): Promise<OriginAccount[]>;
}

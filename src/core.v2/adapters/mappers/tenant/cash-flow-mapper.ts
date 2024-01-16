import { CashFlowType } from './../../../domain/@shared/types/cash-flow.type';
import { CashFlowMapperInterface } from './cash-flow-mapper.interface';

export class CashFlowMapper implements CashFlowMapperInterface {
  public toDomain(raw: any): CashFlowType {
    return {
      id: raw?.id?.toString(),
      externalId: raw?.external_id?.toString(),
      name: raw?.name?.toString()
    };
  }
}

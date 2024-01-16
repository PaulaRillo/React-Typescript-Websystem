import { OriginAccountGatewayInterface } from 'core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { OriginAccountMapperInterface } from 'core.v2/adapters/mappers/origin-account/origin-account-mapper.interface';
import { OriginAccount } from '../../../domain/origin-account/entity/origin-account';
import { OriginAccountFactory } from '../../../domain/origin-account/factory/origin-account-factory';

export class OriginAccountGatewayMemory
  implements OriginAccountGatewayInterface
{
  private readonly originAccountMapper: OriginAccountMapperInterface;

  constructor(private readonly mapperFactory: MapperFactoryInterface) {
    this.originAccountMapper = this.mapperFactory.createOriginAccountMapper();
  }

  async list(): Promise<OriginAccount[]> {
    const mappedOriginAccountList = data.map((dto: any) => {
      return this.originAccountMapper.toDomain(dto);
    });

    return mappedOriginAccountList.map((item: any) => {
      return OriginAccountFactory.create(item);
    });
  }
}

const data = JSON.parse(
  `[{"payment_method_id":"ca7285bf-079e-4462-93e4-4bd624668b27","processor_id":null,"bank_code":"HSBC","bank_name":"HSBC Bank","redacted_bank_account_number":"200-*****6756","currency_code":"USD","account_alias":"Employee Payments Account","account_balance":"2199.840000","balance_in_system_currency":"2199.840000","balance_in_foreign_currency":"0.000000","is_cash_flow_relevant":true},{"payment_method_id":"21a6bd85-6ff3-400b-96cb-b724b3c44cd5","processor_id":null,"bank_code":"CITI","bank_name":"Citibank","redacted_bank_account_number":"300-*****7690","currency_code":"USD","account_alias":"Services Payments Account","account_balance":"0.000000","balance_in_system_currency":"0.000000","balance_in_foreign_currency":"0.000000","is_cash_flow_relevant":true},{"payment_method_id":"5b837d90-1df0-4b84-bdc1-55e1356004bc","processor_id":null,"bank_code":"BOA","bank_name":"Bank of America","redacted_bank_account_number":"100-*****7867","currency_code":"USD","account_alias":"Tax Payments Account","account_balance":"-47279.480000","balance_in_system_currency":"-47279.480000","balance_in_foreign_currency":"0.000000","is_cash_flow_relevant":true},{"payment_method_id":"38ed0b79-3350-490d-bb0b-54ac821fecbb","processor_id":null,"bank_code":"BOA","bank_name":"Bank of America","redacted_bank_account_number":"100-*****7867","currency_code":"USD","account_alias":"Tax Payments Account","account_balance":"-47279.480000","balance_in_system_currency":"-47279.480000","balance_in_foreign_currency":"0.000000","is_cash_flow_relevant":true}]`
);

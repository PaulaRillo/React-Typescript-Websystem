import { OriginAccountFactoryProps } from 'core.v2/domain/origin-account/factory/origin-account-factory.props';
import { setNumberValue } from '../helpers/setNumber';
import { OriginAccountMapperInterface } from './origin-account-mapper.interface';

export class OriginAccountMapper implements OriginAccountMapperInterface {
  public toDomain(dto: OriginAccountDTO): OriginAccountFactoryProps {
    return {
      paymentMethodId: dto.payment_method_id,
      processorId: dto.processor_id,
      bankCode: dto.bank_code,
      bankName: dto.bank_name,
      redactedBankAccountNumber: dto.redacted_bank_account_number,
      currencyCode: dto.currency_code,
      accountAlias: dto.account_alias,
      balanceInLocalCurrency: setNumberValue(dto?.account_balance),
      balanceInSystemCurrency: setNumberValue(dto.balance_in_system_currency),
      balanceInForeignCurrency: setNumberValue(dto.balance_in_foreign_currency),
      isCashFlowRelevant: dto.is_cash_flow_relevant
    };
  }
}

type OriginAccountDTO = {
  payment_method_id: string;
  processor_id: string;
  bank_code: string;
  bank_name: string;
  redacted_bank_account_number: string;
  currency_code: string;
  account_alias: string;
  account_balance: string;
  balance_in_system_currency: string;
  balance_in_foreign_currency: string;
  is_cash_flow_relevant: boolean;
};

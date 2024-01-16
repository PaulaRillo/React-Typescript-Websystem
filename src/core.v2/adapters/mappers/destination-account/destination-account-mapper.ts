import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { DestinationAccountMapperInterface } from './destination-account-mapper.interface';

export class DestinationAccountMapper
  implements DestinationAccountMapperInterface {
  toDomain(dto: DestinationAccountDTO): DestinationAccountType {
    return {
      accountName: dto.account_name,
      bankCode: dto.bank_code,
      paymentMethodId: dto.payment_method_id,
      bankName: dto.bank_name,
      accountAlias: dto.account_alias,
      redactedBankAccountNumber: dto.redacted_bank_account_number,
      currencyCode: dto.currency_code,
      vaultId: dto.vault_id,
      vaultPaymentMethodId: dto.vault_payment_method_id,
      vaultPaymentMethodType: dto?.vault_payment_method_type || 'ach' //TODO: remove this default value
    };
  }
}

type DestinationAccountDTO = {
  account_name: string;
  bank_code: string;
  payment_method_id: string;
  bank_name: string;
  account_alias: string;
  redacted_bank_account_number: string;
  currency_code: string;
  vault_id: string;
  vault_payment_method_id: string;
  vault_payment_method_type: string;
};

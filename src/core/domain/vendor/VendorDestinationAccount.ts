import { VendorDestinationInput } from './VendorDestinationAccountInput';

export class VendorDestinationAccount {
  public readonly paymentMethodId: string;
  public readonly bankName: string;
  public readonly accountAlias: string;
  public readonly redactedBankAccountNumber: string;
  public readonly currencyCode: string;
  public readonly vaultPaymentMethodId: string;

  constructor(input: VendorDestinationInput) {
    this.paymentMethodId = input.payment_method_id;
    this.bankName = input.bank_name;
    this.accountAlias = input.account_alias;
    this.redactedBankAccountNumber = input.redacted_bank_account_number;
    this.currencyCode = input.currency_code;
    this.vaultPaymentMethodId = input.vault_payment_method_id;
  }
}

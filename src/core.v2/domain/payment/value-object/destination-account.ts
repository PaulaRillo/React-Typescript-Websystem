export class DestinationAccount {
  constructor(
    public readonly accountName: string,
    public readonly bankCode: string,
    public readonly bankName: string,
    public readonly redactedBankAccountNumber: string,
    public readonly paymentMethodId: string,
    public readonly accountAlias: string,
    public readonly currencyCode: string,
    public readonly vaultId: string,
    public readonly vaultPaymentMethodId: string,
    public readonly vaultPaymentMethodType: string
  ) { }
}

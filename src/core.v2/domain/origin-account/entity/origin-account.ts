export class OriginAccount {
  public readonly isBalanceNegative!: boolean;

  constructor(
    public readonly paymentMethodId: string,
    public readonly processorId: string,
    public readonly bankCode: string,
    public readonly bankName: string,
    public readonly redactedBankAccountNumber: string,
    public readonly currencyCode: string,
    public readonly accountAlias: string,
    public readonly balanceInLocalCurrency: number,
    public readonly balanceInSystemCurrency: number,
    public readonly balanceInForeignCurrency: number,
    public readonly isCashFlowRelevant: boolean
  ) {
    this.isBalanceNegative = balanceInLocalCurrency < 0;
  }
}

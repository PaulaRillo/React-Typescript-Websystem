export type OriginAccountFactoryProps = {
  paymentMethodId: string;
  processorId: string;
  bankCode: string;
  bankName: string;
  redactedBankAccountNumber: string;
  currencyCode: string;
  accountAlias: string;
  balanceInLocalCurrency: number;
  balanceInSystemCurrency: number;
  balanceInForeignCurrency: number;
  isCashFlowRelevant: boolean;
};

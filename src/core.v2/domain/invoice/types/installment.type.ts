export type InstallmentType = {
  externalId: string;
  number: string;
  percent: number;
  total: number;
  dueDate: string;
  dunningLevel: string;
  totalAmountInForeignCurrency: string;
  lastDunningDate: string;
  isPaymentOrdered: string;
  firstPullSyncAt: string;
  lastPullSyncAt: string;
  firstPushSyncAt: string;
  lastPushSyncAt: string;
};

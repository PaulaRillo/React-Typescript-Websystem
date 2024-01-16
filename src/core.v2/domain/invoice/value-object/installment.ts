export class Installment {
  constructor(
    public readonly externalId?: string,
    public readonly number?: string,
    public readonly percent?: number,
    public readonly total?: number,
    public readonly dueDate?: string,
    public readonly dunningLevel?: string,
    public readonly totalAmountInForeignCurrency?: string,
    public readonly lastDunningDate?: string,
    public readonly isPaymentOrdered?: string,
    public readonly firstPullSyncAt?: string,
    public readonly lastPullSyncAt?: string,
    public readonly firstPushSyncAt?: string,
    public readonly lastPushSyncAt?: string
  ) {}
}

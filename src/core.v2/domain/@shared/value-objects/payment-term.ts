export class PaymentTerm {
  constructor(
    public readonly id?: string,
    public readonly externalId?: string,
    public readonly paymentTermsGroupName?: string,
    public readonly paymentDueMonthStartFrom?: string,
    public readonly numberOfAdditionalMonths?: string,
    public readonly numberOfAdditionalDays?: string,
    public readonly maximumCreditLimit?: string,
    public readonly totalDiscountPercent?: number,
    public readonly latePaymentInterestRateCharge?: string,
    public readonly priceListId?: string,
    public readonly priceListExternalId?: string,
    public readonly commitmentLimit?: string,
    public readonly openIncomingPayment?: string,
    public readonly discountCode?: string,
    public readonly dunningCode?: string,
    public readonly dueDateBasedOn?: string,
    public readonly numberOfInstallments?: string,
    public readonly numberOfToleranceDays?: string,
    public readonly firstPullSyncAt?: string,
    public readonly lastPullSyncAt?: string,
    public readonly firstPushSyncAt?: string,
    public readonly lastPushSyncAt?: string
  ) {}
}

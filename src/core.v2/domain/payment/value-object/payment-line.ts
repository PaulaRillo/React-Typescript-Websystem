export class PaymentLine {
  constructor(
    public readonly id: string,
    public readonly vendorOutgoingPaymentId: string,
    public readonly vendorOutgoingPaymentExternalId: string,
    public readonly documentId: string,
    public readonly documentType: number,
    public readonly apInvoiceExternalId: string,
    public readonly totalAmountPaidToInvoice: number,
    public readonly totalAmountPaidToInvoiceInForeignCurrency: number,
    public readonly totalAmountPaidToInvoiceInSystemCurrency: number,
    public readonly exchangeRate: number,
    public readonly discountPercent: number,
    public readonly totalAmountPaid: number,
    public readonly installmentId: string,
    public readonly installmentExternalId: string,
    public readonly withholdingTaxApplied: number,
    public readonly withholdingTaxAppliedInForeignCurrency: number,
    public readonly withholdingTaxAppliedInSystemCurrency: number,
    public readonly totalDiscount: number,
    public readonly totalDiscountInForeignCurrency: number,
    public readonly totalDiscountInSystemCurrency: number
  ) { }
}

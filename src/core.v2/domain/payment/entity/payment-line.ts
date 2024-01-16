import { Entity } from '../../@shared/entity/entity';
import { Currency } from '../../@shared/value-objects/currency';
import { OriginAccount } from '../value-object/origin-account';
import { Vendor } from '../value-object/vendor';
import { User } from '../value-object/user';
import { CashFlow } from '../value-object/cash-flow';
import { PaymentTransaction } from '../value-object/payment-transaction';
import { Bill } from '../value-object/bill';
import { OutgoingPayment } from '../value-object/outgoing-payment';
import { DestinationAccount } from '../value-object/destination-account';

export class PaymentLine extends Entity {
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
    public readonly totalDiscountInSystemCurrency: number,
    public readonly createdAt: string,
    public readonly updatedAt: string,
    public readonly createdBy: string,
    public readonly updatedBy: string,
    public readonly firstPullSyncAt: string,
    public readonly lastPullSyncAt: string,
    public readonly firstPushSyncAt: string,
    public readonly lastPushSyncAt: string,
    public readonly vendor: Vendor,
    public readonly bill: Bill,
    public readonly currency: Currency,
    public readonly originAccount: OriginAccount,
    public readonly destinationAccount: DestinationAccount,
    public readonly outgoingPayment: OutgoingPayment,
    public readonly requester: User,
    public readonly paymentTransaction: PaymentTransaction,
    public readonly cashFlow: CashFlow
  ) {
    super();
  }
}

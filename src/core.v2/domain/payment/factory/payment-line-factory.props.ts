import { BillType } from 'core.v2/domain/@shared/types/bill.type';
import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import type { CurrencyType } from 'core.v2/domain/@shared/types/currency.type';
import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { OriginAccountType } from 'core.v2/domain/@shared/types/origin-account.type';
import { OutgoingPaymentType } from 'core.v2/domain/@shared/types/outgoing-payment.type';
import { PaymentTransactionType } from 'core.v2/domain/@shared/types/payment-transaction.type';
import { UserType } from 'core.v2/domain/@shared/types/user.type';
import { VendorType } from 'core.v2/domain/@shared/types/vendor.type';

export type PaymentLineFactoryProps = {
  id: string;
  vendorOutgoingPaymentId: string;
  vendorOutgoingPaymentExternalId: string;
  documentId: string;
  documentType: number;
  apInvoiceExternalId: string;
  totalAmountPaidToInvoice: number;
  totalAmountPaidToInvoiceInForeignCurrency: number;
  totalAmountPaidToInvoiceInSystemCurrency: number;
  exchangeRate: number;
  discountPercent: number;
  totalAmountPaid: number;
  installmentId: string;
  installmentExternalId: string;
  withholdingTaxApplied: number;
  withholdingTaxAppliedInForeignCurrency: number;
  withholdingTaxAppliedInSystemCurrency: number;
  totalDiscount: number;
  totalDiscountInForeignCurrency: number;
  totalDiscountInSystemCurrency: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  firstPullSyncAt: string;
  lastPullSyncAt: string;
  firstPushSyncAt: string;
  lastPushSyncAt: string;
  vendor: VendorType;
  bill: BillType;
  currency: CurrencyType;
  originAccount: OriginAccountType;
  destinationAccount: DestinationAccountType;
  outgoingPayment: OutgoingPaymentType;
  requester: UserType;
  paymentTransaction: PaymentTransactionType;
  cashFlow: CashFlowType;
};

import type { CurrencyType } from 'core.v2/domain/@shared/types/currency.type';
import type { CurrencyValueType } from 'core.v2/domain/@shared/types/currency-value.type';
import type { InstallmentType } from '../types/installment.type';
import type { InvoiceFromType } from '../types/invoice-from.type';
import type { InvoiceLineType } from '../types/invoice-line.type';
import type { PaymentTermType } from '../types/payment-term.type';

export type InvoiceFactoryProps = {
  id: string;
  externalId: string;
  visualId: string;

  externalApInvoiceNumber: string;
  referenceNumberExternal: string;
  transactionContentType: string;

  dueDate: string;
  postingDate: string;
  createdAt: string;

  invoiceStatus: string;
  invoiceType: string;
  invoiceDate: string;

  invoiceFrom: InvoiceFromType;
  invoiceLines: InvoiceLineType[];
  installments: Partial<InstallmentType>[];
  paymentTerm: Partial<PaymentTermType>;
  currency: CurrencyType;

  taxPercent: number;
  discountPercent: number;
  invoiceTotal: CurrencyValueType;
  baseAmount: CurrencyValueType;
  paidToDateAmount: CurrencyValueType;
  additionalExpenses: CurrencyValueType;
  totalTax: CurrencyValueType;
  totalDiscountAmount: CurrencyValueType;
  totalDownPaymentAmount: CurrencyValueType;
};

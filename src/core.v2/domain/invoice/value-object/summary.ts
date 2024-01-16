import { CurrencyValue } from './currency-value';

export class Summary {
  constructor(
    public readonly taxPercent: number,
    public readonly discountPercent: number,
    public readonly invoiceTotal: CurrencyValue,
    public readonly baseAmount: CurrencyValue,
    public readonly paidToDateAmount: CurrencyValue,
    public readonly additionalExpenses: CurrencyValue,
    public readonly totalTax: CurrencyValue,
    public readonly totalDiscountAmount: CurrencyValue,
    public readonly totalDownPaymentAmount: CurrencyValue,
    public readonly balanceDue: CurrencyValue,
    public readonly subtotal: CurrencyValue
  ) {}
}

import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { Entity } from '../../@shared/entity/entity';
import { DomainEvent } from '../../@shared/event/domain-event';
import { Currency } from '../../@shared/value-objects/currency';
import { PaymentTerm } from '../../@shared/value-objects/payment-term';
import { Installment } from '../value-object/installment';
import { InvoiceFrom } from '../value-object/invoice-from';
import { InvoiceLine } from '../value-object/invoice-line';
import { Summary } from '../value-object/summary';

export class Invoice extends Entity {
  public destinationAccount!: DestinationAccountType;

  constructor(
    public readonly id: string,
    public readonly externalId: string,
    public readonly visualId: string,

    public readonly externalApInvoiceNumber: string,
    public readonly referenceNumberExternal: string,
    public readonly transactionContentType: string,

    public readonly dueDate: string,
    public readonly postingDate: string,
    public readonly createdAt: string,

    public readonly invoiceStatus: string,
    public readonly invoiceType: string,
    public readonly invoiceDate: string,

    public paymentAmount: number,

    public readonly currency: Currency,
    public readonly invoiceFrom: InvoiceFrom,
    public readonly invoiceLines: InvoiceLine[],
    public readonly installments: Installment[],
    public readonly paymentTerm: PaymentTerm,

    public readonly summary: Summary
  ) {
    super();
  }

  setPaymentAmount(paymentAmount: number) {
    if (paymentAmount <= 0) return;
    if (paymentAmount > this.summary.balanceDue.value) return;
    this.paymentAmount = paymentAmount;
    this.dispatchInvoiceUpdatedEvent();
  }

  setDestinationAccount(destinationAccount: DestinationAccountType) {
    this.destinationAccount = destinationAccount;
    this.dispatchInvoiceUpdatedEvent();
  }

  matchesOriginAccountCurrency(originAccountCurrencyCode: string): boolean {
    if (!originAccountCurrencyCode) return false;
    return this.currency.iso4217Alpha3 === originAccountCurrencyCode;
  }

  matchesDestinationAccountCurrency(): boolean {
    if (!this.destinationAccount) return false;
    return this.currency.iso4217Alpha3 === this.destinationAccount.currencyCode;
  }

  isPayable(originAccountCurrencyCode?: string): boolean {
    if (!originAccountCurrencyCode) return false;
    return this.matchesOriginAccountCurrency(originAccountCurrencyCode) && this.matchesDestinationAccountCurrency(); //prettier-ignore
  }

  private dispatchInvoiceUpdatedEvent() {
    this.dispatch(
      new DomainEvent('InvoiceUpdated', {
        destinationAccount: this.destinationAccount,
        paymentAmount: this.paymentAmount,
        invoice: this
      })
    );
  }
}

import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import { v4 as uuid } from 'uuid';
import { ErrorType } from '../../../../core.v2/domain/@shared/types/error.type';
import { Invoice } from '../../../../core.v2/domain/invoice/entity/invoice';
import { Entity } from '../../@shared/entity/entity';
import { DomainEvent } from '../../@shared/event/domain-event';
import { DestinationAccountType } from '../../@shared/types/destination-account.type';
import { OriginAccount } from '../../origin-account/entity/origin-account';
import { CalculatorPaymentRequestFactory } from '../factory/calculator-payment-request-factory';

type InputInit = {
  userMfaEnabled: boolean;
  userHasPermission: boolean;
  allCurrenciesConfigured: boolean;
};

export class PaymentRequest extends Entity {
  public paymentRequestId: string;

  public originAccount!: OriginAccount | undefined;

  public cashFlow!: CashFlowType | undefined;
  public invoices: Invoice[] = [];
  public mfaCode = '';

  public hasError = false;
  public errors: ErrorType[] = [];

  private wasReviewed = false;
  public isCashFlowRelevant = false;
  private isEditable = false;

  private constructor() {
    super();
    this.setIsEditable(false);
    this.paymentRequestId = uuid();
    this.isPayable();
  }

  static instance: PaymentRequest | undefined;

  static getInstance() {
    if (!PaymentRequest.instance) {
      PaymentRequest.instance = new PaymentRequest();
    }
    return PaymentRequest.instance;
  }

  init(data: InputInit) {
    this.setIsEditable(
      data.userMfaEnabled &&
        data.userHasPermission &&
        data.allCurrenciesConfigured
    );
    this.dispatchPaymentRequestUpdatedEvent();
  }

  addInvoices(invoices: Invoice[]) {
    if (!this.isEditable) return;
    if (invoices.length === 0) return;
    const newInvoices: Invoice[] = [];
    for (const invoice of invoices) {
      const index = this.invoices.findIndex((i) => i.id === invoice.id);
      if (index === -1) {
        newInvoices.push(invoice);
      }
    }
    this.invoices = [...this.invoices, ...newInvoices];
    this.dispatchPaymentRequestUpdatedEvent();
  }

  removeInvoices(ids: string[]) {
    if (!this.isEditable) return;
    if (ids.length === 0) return;
    if (this.invoices.length === 0) return;
    this.invoices = this.invoices.filter(
      (invoice) => !ids.includes(invoice.id)
    );
    this.dispatchPaymentRequestUpdatedEvent();
  }

  addMfa(mfa: string) {
    this.mfaCode = mfa;
    this.dispatchPaymentRequestUpdatedEvent();
  }

  setOriginAccount(originAccount: OriginAccount) {
    if (!this.isEditable) return;
    if (!originAccount) return;
    this.originAccount = originAccount;
    this.isCashFlowRelevant = originAccount.isCashFlowRelevant;
    this.dispatchPaymentRequestUpdatedEvent();
  }

  setInvoicePaymentAmount(invoiceId: string, paymentAmount: number) {
    if (!this.isEditable) return;
    const invoice = this.invoices.find((i) => i.id === invoiceId);
    if (!invoice) return;
    invoice.setPaymentAmount(paymentAmount);
    this.dispatchPaymentRequestUpdatedEvent();
  }

  setInvoiceDestinationAccount(
    invoiceId: string,
    destinationAccount: DestinationAccountType
  ) {
    if (!this.isEditable) return;
    const invoice = this.invoices.find((i) => i.id === invoiceId);
    if (!invoice) return;
    invoice.setDestinationAccount(destinationAccount);
    this.dispatchPaymentRequestUpdatedEvent();
  }

  getWasReviewed(): boolean {
    return this.wasReviewed;
  }

  setWasReviewed(wasReviewed: boolean) {
    this.wasReviewed = wasReviewed;
    this.dispatchPaymentRequestUpdatedEvent();
  }

  getIsEditable(): boolean {
    return this.isEditable;
  }

  setIsEditable(isEditable: boolean) {
    this.isEditable = isEditable;
    this.dispatchPaymentRequestUpdatedEvent();
  }

  setCashFlow(cashFlow: CashFlowType | undefined) {
    if (!this.isEditable) return;
    this.cashFlow = cashFlow;
    this.dispatchPaymentRequestUpdatedEvent();
  }

  isAllInvoicesPayable(): boolean {
    const isAllInvoicesPayable = this.invoices.every((invoice) => {
      return invoice.isPayable(this.originAccount?.currencyCode);
    });
    if (!isAllInvoicesPayable) {
      this.hasError = true;
      this.errors.push({
        context: 'invoice.issues',
        message: 'Invoice issues'
      });
    }
    return isAllInvoicesPayable;
  }

  isBalanceSufficient(): boolean {
    const total = this.getTotal();
    if (total <= 0) {
      return true;
    }
    if (!this.originAccount) {
      return true;
    }
    const balance = this.originAccount?.balanceInLocalCurrency;
    if (balance < total) {
      this.hasError = true;
      this.errors.push({
        context: 'balance.insufficient',
        message: 'Balance is insufficient'
      });
    }
    return balance >= total;
  }

  hasOriginAccount(): boolean {
    if (!this.originAccount) {
      this.hasError = true;
      this.errors.push({
        context: 'origin.account.required',
        message: 'Origin account is required'
      });
    }
    return !!this.originAccount;
  }

  hasInvoice(): boolean {
    if (this.invoices.length === 0) {
      this.hasError = true;
      this.errors.push({
        context: 'invoice.required',
        message: 'Invoice is required'
      });
    }
    return this.invoices.length > 0;
  }

  hasCashflow(): boolean {
    if (this.isCashFlowRelevant && !this.cashFlow) {
      this.hasError = true;
      this.errors.push({
        context: 'cashflow.required',
        message: 'Cashflow is required'
      });
      return !this.cashFlow;
    }
    return true;
  }

  isPayable(): boolean {
    this.errors = [];
    this.hasError = false;
    this.hasOriginAccount();
    this.hasInvoice();
    this.isAllInvoicesPayable();
    this.isBalanceSufficient();
    this.hasCashflow();
    return !this.hasError;
  }

  removeInvoicesWithIssues() {
    if (!this.isEditable) return;
    this.invoices = this.invoices.filter((invoice) => {
      return invoice.isPayable(this.originAccount?.currencyCode);
    });
    this.dispatchPaymentRequestUpdatedEvent();
  }

  getEndingBalance(): number {
    if (!this.originAccount) {
      return 0;
    }
    const total = this.getTotal();
    if (total <= 0) {
      return 0;
    }

    return CalculatorPaymentRequestFactory.createEndingBalanceCalculator().calculate(
      {
        balance: this.originAccount.balanceInLocalCurrency,
        total
      }
    );
  }

  getOriginAccountCurrencyCode(): string | undefined {
    return this.originAccount?.currencyCode;
  }

  getTotal(): number {
    if (this.invoices.length === 0) {
      return 0;
    }
    const totalCalculator =
      CalculatorPaymentRequestFactory.createTotalCalculator();
    return totalCalculator.calculate(this.invoices);
  }

  private dispatchPaymentRequestUpdatedEvent() {
    this.dispatch(
      new DomainEvent('PaymentRequestUpdated', {
        originAccount: this.originAccount,
        invoices: this.invoices,
        total: this.getTotal(),
        endingBalance: this.getEndingBalance(),
        isBalanceSufficient: this.isBalanceSufficient(),
        isCashFlowRelevant: this.isCashFlowRelevant,
        isPayable: this.isPayable(),
        isAllInvoicesPayable: this.isAllInvoicesPayable(),
        isEditable: this.isEditable,
        cashFlow: this.cashFlow,
        wasReviewed: this.wasReviewed,
        hasError: this.hasError,
        errors: this.errors
      })
    );
  }

  reset() {
    this.hasError = false;
    this.isEditable = false;
    this.wasReviewed = false;
    this.errors = [];
    this.invoices = [];
    this.cashFlow = undefined;
    this.isCashFlowRelevant = false;
    this.originAccount = undefined;
    this.paymentRequestId = uuid();
    this.mfaCode = '';
    this.isPayable();
    this.dispatchPaymentRequestUpdatedEvent();
  }
}

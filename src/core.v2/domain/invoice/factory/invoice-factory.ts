import { TenantSettingsType } from '../../@shared/types/tenant-settings.type';
import { Currency } from '../../@shared/value-objects/currency';
import { PaymentTerm } from '../../@shared/value-objects/payment-term';
import { Invoice } from '../entity/invoice';
import { CurrencyValue } from '../value-object/currency-value';
import { Installment } from '../value-object/installment';
import { InvoiceFrom } from '../value-object/invoice-from';
import { InvoiceLine } from '../value-object/invoice-line';
import { Summary } from '../value-object/summary';
import { InvoiceCalculatorFactory } from './calculator-factory';
import { InvoiceFactoryProps } from './invoice-factory.props';

export class InvoiceFactory {
  public static create(
    props: InvoiceFactoryProps,
    settings: TenantSettingsType
  ): Invoice {
    const invoiceCurrency = new Currency(
      props.currency.id,
      props.currency.externalId,
      props.currency.iso4217Alpha3,
      props.currency.name,
      props.currency.symbol
    );

    const invoiceFrom = new InvoiceFrom(
      props.invoiceFrom.id,
      props.invoiceFrom.externalId,
      props.invoiceFrom.visualId,
      props.invoiceFrom.name
    );

    const invoiceLines = props.invoiceLines
      ? props.invoiceLines.map((invoiceLine) => {
          const lineTotal = new CurrencyValue(
            invoiceLine.lineTotal.localCurrency,
            invoiceLine.lineTotal.systemCurrency,
            invoiceLine.lineTotal.foreignCurrency,
            invoiceCurrency,
            settings.localCurrencyId,
            settings.systemCurrencyId
          );

          return new InvoiceLine(
            invoiceLine.id,
            invoiceLine.externalId,
            invoiceLine.lineNumber,
            invoiceLine.itemId,
            invoiceLine.itemExternalId,
            invoiceLine.itemDescription,
            invoiceLine.quantity,
            invoiceLine.unitPrice,
            lineTotal,
            invoiceCurrency
          );
        })
      : [];

    const installments = props.installments
      ? props.installments.map((installment) => {
          return new Installment(
            installment.externalId,
            installment.number,
            installment.percent,
            installment.total,
            installment.dueDate,
            installment.dunningLevel,
            installment.totalAmountInForeignCurrency,
            installment.lastDunningDate,
            installment.isPaymentOrdered,
            installment.firstPullSyncAt,
            installment.lastPullSyncAt,
            installment.firstPushSyncAt,
            installment.lastPushSyncAt
          );
        })
      : [];

    const paymentTerm = new PaymentTerm(
      props.paymentTerm.id,
      props.paymentTerm.externalId,
      props.paymentTerm.paymentTermsGroupName,
      props.paymentTerm.paymentDueMonthStartFrom,
      props.paymentTerm.numberOfAdditionalMonths,
      props.paymentTerm.numberOfAdditionalDays,
      props.paymentTerm.maximumCreditLimit,
      props.paymentTerm.totalDiscountPercent,
      props.paymentTerm.latePaymentInterestRateCharge,
      props.paymentTerm.priceListId,
      props.paymentTerm.priceListExternalId,
      props.paymentTerm.commitmentLimit,
      props.paymentTerm.openIncomingPayment,
      props.paymentTerm.discountCode,
      props.paymentTerm.dunningCode,
      props.paymentTerm.dueDateBasedOn,
      props.paymentTerm.numberOfInstallments,
      props.paymentTerm.numberOfToleranceDays,
      props.paymentTerm.firstPullSyncAt,
      props.paymentTerm.lastPullSyncAt,
      props.paymentTerm.firstPushSyncAt,
      props.paymentTerm.lastPushSyncAt
    );

    // Summary

    const createCurrencyValue = (key: CurrencyValueKey) => {
      return new CurrencyValue(
        props[key].localCurrency,
        props[key].systemCurrency,
        props[key].foreignCurrency,
        invoiceCurrency,
        settings.localCurrencyId,
        settings.systemCurrencyId
      );
    };

    const invoiceTotal = createCurrencyValue('invoiceTotal');
    const baseAmount = createCurrencyValue('baseAmount');
    const paidToDateAmount = createCurrencyValue('paidToDateAmount');
    const additionalExpenses = createCurrencyValue('additionalExpenses');
    const totalTax = createCurrencyValue('totalTax');
    const totalDiscountAmount = createCurrencyValue('totalDiscountAmount');
    const totalDownPaymentAmount = createCurrencyValue('totalDownPaymentAmount'); // prettier-ignore

    const balanceDueCalculator = InvoiceCalculatorFactory.createBalanceDueCalculator(); // prettier-ignore
    const calculatedBalanceDue = balanceDueCalculator.calculate({ invoiceTotal, paidToDateAmount }); //prettier-ignore

    const balanceDue = new CurrencyValue(
      calculatedBalanceDue.localCurrency,
      calculatedBalanceDue.systemCurrency,
      calculatedBalanceDue.foreignCurrency,
      invoiceCurrency,
      settings.localCurrencyId,
      settings.systemCurrencyId
    );

    const subtotalCalculator = InvoiceCalculatorFactory.createSubtotalCalculator(); // prettier-ignore
    const calculatedSubtotal = subtotalCalculator.calculate(invoiceLines); //prettier-ignore

    const subtotal = new CurrencyValue(
      calculatedSubtotal.localCurrency,
      calculatedSubtotal.systemCurrency,
      calculatedSubtotal.foreignCurrency,
      invoiceCurrency,
      settings.localCurrencyId,
      settings.systemCurrencyId
    );

    const summary = new Summary(
      props.taxPercent,
      props.discountPercent,
      invoiceTotal,
      baseAmount,
      paidToDateAmount,
      additionalExpenses,
      totalTax,
      totalDiscountAmount,
      totalDownPaymentAmount,
      balanceDue,
      subtotal
    );

    const paymentAmount = balanceDue.value;

    return new Invoice(
      props.id,
      props.externalId,
      props.visualId,

      props.externalApInvoiceNumber,
      props.referenceNumberExternal,
      props.transactionContentType,

      props.dueDate,
      props.postingDate,
      props.createdAt,

      props.invoiceStatus,
      props.invoiceType,
      props.invoiceDate,

      paymentAmount,

      invoiceCurrency,
      invoiceFrom,
      invoiceLines,
      installments,
      paymentTerm,

      summary
    );
  }
}

type CurrencyValueKey = keyof Pick<
  InvoiceFactoryProps,
  | 'invoiceTotal'
  | 'baseAmount'
  | 'paidToDateAmount'
  | 'additionalExpenses'
  | 'totalTax'
  | 'totalDiscountAmount'
  | 'totalDownPaymentAmount'
>;

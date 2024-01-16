import { InstallmentType } from 'core.v2/domain/invoice/types/installment.type';
import { InvoiceLineType } from 'core.v2/domain/invoice/types/invoice-line.type';
import { PaymentTermType } from 'core.v2/domain/invoice/types/payment-term.type';
import { CurrencyMapper } from '../currency/currency-mapper';
import { CurrencyMapperInterface } from '../currency/currency-mapper.interface';
import { setNumberValue } from '../helpers/setNumber';
import type { InvoiceMapperInterface } from './invoice-mapper.interface';
// prettier-ignore
export class InvoiceMapper implements InvoiceMapperInterface {
  private readonly currencyMapper: CurrencyMapperInterface;

  constructor() {
    this.currencyMapper = new CurrencyMapper()
  }

  toDomain(invoiceDTO: any)  {
    return {
      id: invoiceDTO.id?.toString(),
      externalId: invoiceDTO.external_id?.toString(),
      visualId: invoiceDTO.visual_id?.toString() || invoiceDTO.external_id?.toString(), //TODO: check with frank

      externalApInvoiceNumber: invoiceDTO.external_ap_invoice_number?.toString(),
      referenceNumberExternal: invoiceDTO.reference_number_external?.toString(),
      transactionContentType: invoiceDTO.transaction_content_type?.toString(),

      dueDate: invoiceDTO.due_date?.toString(),
      postingDate: invoiceDTO.posting_date?.toString(),
      createdAt: invoiceDTO.created_at?.toString(),

      invoiceStatus: invoiceDTO?.invoice_status?.description?.toString(),
      invoiceType: invoiceDTO.invoice_type?.toString(),
      invoiceDate: invoiceDTO.created_at?.toString(),

      invoiceFrom: {
        id: invoiceDTO.vendor?.id?.toString(),
        name: invoiceDTO.vendor?.trade_name?.toString(),
        visualId: invoiceDTO.vendor?.visual_id?.toString(),
        externalId: invoiceDTO.vendor?.external_id?.toString(),
      },

      invoiceLines: mapInvoiceLines(invoiceDTO.ap_invoice_lines, this.currencyMapper),
      installments: mapInstallments(invoiceDTO.ap_invoice_installments),
      paymentTerm: setPaymentTerm(invoiceDTO.payment_term),
      currency: this.currencyMapper.toDomain(invoiceDTO.currency),

      taxPercent: setNumberValue(invoiceDTO.vat_tax_percent),
      discountPercent: setNumberValue(invoiceDTO.discount_percent),

      invoiceTotal: {
        localCurrency: setNumberValue(invoiceDTO?.invoice_total),
        systemCurrency: setNumberValue(invoiceDTO?.invoice_total_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.invoice_total_in_foreign_currency),
      },

      baseAmount: {
        localCurrency: setNumberValue(invoiceDTO?.base_amount),
        systemCurrency: setNumberValue(invoiceDTO?.base_amount_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.base_amount_in_foreign_currency),
      },

      paidToDateAmount: {
        localCurrency: setNumberValue(invoiceDTO?.paid_to_date_amount),
        systemCurrency: setNumberValue(invoiceDTO?.paid_to_date_amount_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.paid_to_date_amount_in_foreign_currency),
      },

      additionalExpenses: {
        localCurrency: setNumberValue(invoiceDTO?.additional_expenses),
        systemCurrency: setNumberValue(invoiceDTO?.additional_expenses_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.additional_expenses_in_foreign_currency),
      },

      totalTax: {
        localCurrency: setNumberValue(invoiceDTO?.total_vat_tax),
        systemCurrency: setNumberValue(invoiceDTO?.total_vat_tax_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.total_vat_tax_in_foreign_currency),
      },

      totalDiscountAmount: {
        localCurrency: setNumberValue(invoiceDTO?.total_discount_amount),
        systemCurrency: setNumberValue(invoiceDTO?.total_discount_amount_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.total_discount_amount_in_foreign_currency),
      },

      totalDownPaymentAmount: {
        localCurrency: setNumberValue(invoiceDTO?.total_down_payment_amount),
        systemCurrency: setNumberValue(invoiceDTO?.total_down_payment_amount_in_system_currency),
        foreignCurrency: setNumberValue(invoiceDTO?.total_down_payment_amount_in_foreign_currency),
      },
    };
  }
}

// prettier-ignore
const mapInvoiceLines = (invoiceLines: any[], currencyMapper: CurrencyMapper): InvoiceLineType[] => {

  if(!invoiceLines || invoiceLines.length === 0) return [];
  // prettier-ignore
  return invoiceLines?.map((invoiceLine: any) => {
    return {
      id: invoiceLine.ap_invoice_id?.toString(),
      externalId: invoiceLine.ap_invoice_external_id?.toString(),
      lineNumber: Number(invoiceLine.line_number),
      itemId: invoiceLine.item_id?.toString(),
      itemExternalId: invoiceLine.item_external_id?.toString(),
      itemDescription: invoiceLine.item_description?.toString(),
      quantity: Number(invoiceLine.quantity),
      unitPrice: Number(invoiceLine.unit_price),
      lineTotal: {
        localCurrency: Number(invoiceLine.line_total),
        systemCurrency: Number(invoiceLine.line_total_in_system_currency),
        foreignCurrency: Number(invoiceLine.line_total_in_foreign_currency),
      },
      currency: currencyMapper.toDomain(invoiceLine.currency)
    };
  });
};

const mapInstallments = (installments: any[]): InstallmentType[] => {
  if (!installments || installments.length === 0) return [];
  // prettier-ignore
  return installments?.map((installment: any) => {
    return {
      externalId: installment.external_id?.toString(),
      number: installment.installment_number?.toString(),
      percent: setNumberValue(installment.installment_percent),
      total: setNumberValue(installment.installment_total),
      dueDate: installment.due_date?.toString(),
      dunningLevel: installment.dunning_level?.toString(),
      totalAmountInForeignCurrency: installment.installment_total_amount_in_foreign_currency?.toString(), //WARNING: Why only in foreign currency?
      lastDunningDate: installment.last_dunning_date?.toString(),
      isPaymentOrdered: installment.is_payment_ordered?.toString(),
      firstPullSyncAt: installment.first_pull_sync_at?.toString(),
      lastPullSyncAt: installment.last_pull_sync_at?.toString(),
      firstPushSyncAt: installment.first_push_sync_at?.toString(),
      lastPushSyncAt: installment.last_push_sync_at?.toString()
    };
  });
};

const setPaymentTerm = (paymentTerm: any): PaymentTermType => {
  // prettier-ignore
  return {
    id: paymentTerm?.id?.toString(),
    externalId: paymentTerm?.external_id?.toString(),
    paymentTermsGroupName: paymentTerm?.payment_terms_group_name?.toString(),
    paymentDueMonthStartFrom: paymentTerm?.payment_due_month_start_from?.toString(),
    numberOfAdditionalMonths: paymentTerm?.number_of_additional_months?.toString(),
    numberOfAdditionalDays: paymentTerm?.number_of_additional_days?.toString(),
    maximumCreditLimit: paymentTerm?.maximum_credit_limit?.toString(),
    totalDiscountPercent: paymentTerm?.total_discount_percent?.toString(),
    latePaymentInterestRateCharge: paymentTerm?.late_payment_interest_rate_charge?.toString(),
    priceListId: paymentTerm?.price_list_id?.toString(),
    priceListExternalId: paymentTerm?.price_list_external_id?.toString(),
    commitmentLimit: paymentTerm?.commitment_limit?.toString(),
    openIncomingPayment: paymentTerm?.open_incoming_payment?.toString(),
    discountCode: paymentTerm?.discount_code?.toString(),
    dunningCode: paymentTerm?.dunning_code?.toString(),
    dueDateBasedOn: paymentTerm?.due_date_based_on?.toString(),
    numberOfInstallments: paymentTerm?.number_of_installments?.toString(),
    numberOfToleranceDays: paymentTerm?.number_of_tolerance_days?.toString(),
    firstPullSyncAt: paymentTerm?.first_pull_sync_at?.toString(),
    lastPullSyncAt: paymentTerm?.last_pull_sync_at?.toString(),
    firstPushSyncAt: paymentTerm?.first_push_sync_at?.toString(),
    lastPushSyncAt: paymentTerm?.last_push_sync_at?.toString(),
  }
};

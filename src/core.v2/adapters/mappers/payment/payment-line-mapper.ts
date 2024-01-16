import type { UserType } from 'core.v2/domain/@shared/types/user.type';
import { OriginAccountType } from 'core.v2/domain/@shared/types/origin-account.type';
import { VendorType } from 'core.v2/domain/@shared/types/vendor.type';
import type { PaymentLineMapperInterface } from './payment-line-mapper.interface';
import { PaymentTransactionType } from 'core.v2/domain/@shared/types/payment-transaction.type';
import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import { BillType } from 'core.v2/domain/@shared/types/bill.type';
import { OutgoingPaymentType } from 'core.v2/domain/@shared/types/outgoing-payment.type';
import { CurrencyMapperInterface } from '../currency/currency-mapper.interface';
import { CurrencyMapper } from '../currency/currency-mapper';
import { DestinationAccountType } from 'core.v2/domain/@shared/types/destination-account.type';
import { PaymentStatusType } from 'core.v2/domain/@shared/types/payment-status.type';

// prettier-ignore
export class PaymentLineMapper implements PaymentLineMapperInterface {
  private readonly currencyMapper: CurrencyMapperInterface;

  constructor() {
    this.currencyMapper = new CurrencyMapper()
  }

  toDomain(paymentDTO: any) {
    return {
      id: paymentDTO?.id?.toString(),
      vendorOutgoingPaymentId: paymentDTO?.vendor_outgoing_payment_id?.toString(),
      vendorOutgoingPaymentExternalId: paymentDTO?.vendor_outgoing_payment_external_id?.toString(),
      documentId: paymentDTO?.document_id?.toString(),
      documentType: Number(paymentDTO?.document_type),
      apInvoiceExternalId: paymentDTO?.ap_invoice_external_id?.toString(),
      totalAmountPaidToInvoice: Number(paymentDTO?.total_amount_paid_to_invoice),
      totalAmountPaidToInvoiceInForeignCurrency: Number(paymentDTO?.total_amount_paid_to_invoice_in_foreign_currency),
      totalAmountPaidToInvoiceInSystemCurrency: Number(paymentDTO?.total_amount_paid_to_invoice_in_system_currency),
      exchangeRate: Number(paymentDTO?.exchange_rate),
      discountPercent: Number(paymentDTO?.discount_percent),
      totalAmountPaid: Number(paymentDTO?.total_amount_paid),
      installmentId: paymentDTO?.installment_id?.toString(),
      installmentExternalId: paymentDTO?.installment_external_id?.toString(),
      withholdingTaxApplied: Number(paymentDTO?.withholding_tax_applied),
      withholdingTaxAppliedInForeignCurrency: Number(paymentDTO?.withholding_tax_applied_in_foreign_currency),
      withholdingTaxAppliedInSystemCurrency: Number(paymentDTO?.withholding_tax_applied_in_system_currency),
      totalDiscount: Number(paymentDTO?.total_discount),
      totalDiscountInForeignCurrency: Number(paymentDTO?.total_discount_in_foreign_currency),
      totalDiscountInSystemCurrency: Number(paymentDTO?.total_discount_in_system_currency),
      createdAt: paymentDTO?.created_at?.toString(),
      updatedAt: paymentDTO?.updated_at?.toString(),
      createdBy: paymentDTO?.created_by?.toString(),
      updatedBy: paymentDTO?.updated_by?.toString(),
      firstPullSyncAt: paymentDTO?.first_pull_sync_at?.toString(),
      lastPullSyncAt: paymentDTO?.last_pull_sync_at?.toString(),
      firstPushSyncAt: paymentDTO?.first_push_sync_at?.toString(),
      lastPushSyncAt: paymentDTO?.last_push_sync_at?.toString(),
      vendor: setVendor(paymentDTO?.vendor),
      bill: setBill(paymentDTO?.ap_invoice),
      currency: this.currencyMapper.toDomain(paymentDTO?.currency),
      originAccount: setOriginAccount(paymentDTO?.origin_account),
      destinationAccount: setDestinationAccount(paymentDTO?.destination_account),
      outgoingPayment: setOutgoingPayment(paymentDTO?.outgoing_payment),
      requester: setUser(paymentDTO?.requester),
      paymentTransaction: setPaymentTransaction(paymentDTO?.payment_transaction),
      status: setStatus(paymentDTO?.status),
      cashFlow: setCashFlow(paymentDTO?.cash_flow),
    }
  }
}

const setVendor = (vendor: any): VendorType => {
  return {
    id: vendor?.id?.toString(),
    externalId: vendor?.external_id?.toString(),
    visualId: vendor?.visual_id?.toString(),
    tradeName: vendor?.trade_name?.toString(),
    legalName: vendor?.legal_name?.toString()
  };
};

const setBill = (bill: any): BillType => {
  return {
    id: bill?.id?.toString(),
    visualId: bill?.visual_id?.toString(),
    externalId: bill?.external_id?.toString(),
    externalApInvoiceNumber: bill?.external_ap_invoice_number?.toString(),
    referenceNumberExternal: bill?.reference_number_external?.toString(),
    transactionContentType: Number(bill?.transaction_content_type),
    invoiceType: Number(bill?.invoice_type),
    postingDate: bill?.posting_date?.toString(),
    dueDate: bill?.due_date?.toString(),
    invoiceTotal: Number(bill?.invoice_total),
    invoiceAuthorizationStatusId: Number(bill?.invoice_authorization_status_id),
    invoiceStatusId: Number(bill?.invoice_status_id)
  };
};

const setOriginAccount = (account: any): OriginAccountType => {
  return {
    id: account?.id?.toString(),
    externalId: account?.external_id?.toString(),
    bankId: account?.bank_id?.toString(),
    bankCode: account?.bank_code?.toString(),
    redactedAccountNumber: account?.redacted_account_number?.toString(),
    accountName: account?.account_name?.toString(),
    countryId: account?.country_id?.toString(),
    countryExternalId: account?.country_external_id?.toString(),
    county: account?.county?.toString(),
    state: account?.state?.toString(),
    iban: account?.iban?.toString(),
    zipCode: account?.zip_code?.toString(),
    city: account?.city?.toString(),
    block: account?.block?.toString(),
    branch: account?.branch?.toString(),
    street: account?.street?.toString(),
    currencyId: account?.currency_id?.toString(),
    generalLedgerAccountId: account?.general_ledger_account_id?.toString(),
    generalLedgerAccountExternalId:
      account?.general_ledger_account_external_id?.toString(),
    createdAt: account?.created_at?.toString(),
    updatedAt: account?.updated_at?.toString(),
    createdBy: account?.created_by?.toString(),
    updatedBy: account?.updated_by?.toString()
  };
};

const setDestinationAccount = (account: any): DestinationAccountType => {
  return {
    accountName: account?.account_name?.toString(),
    bankCode: account?.bank_code?.toString(),
    bankName: account?.bank_name?.toString(),
    redactedBankAccountNumber: account?.redacted_account_number?.toString(),
    paymentMethodId: account?.payment_method_id?.toString(),
    accountAlias: account?.account_alias?.toString(),
    currencyCode: account?.currency_code?.toString(),
    vaultId: account?.vault_id?.toString(),
    vaultPaymentMethodId: account?.vault_payment_method_id?.toString(),
    vaultPaymentMethodType: account?.vault_payment_method_type?.toString()
  };
};

const setOutgoingPayment = (outgoingPayment: any): OutgoingPaymentType => {
  return {
    id: outgoingPayment?.id?.toString(),
    externalId: outgoingPayment?.external_id?.toString(),
    externalVendorOutgoingPaymentNumber:
      outgoingPayment?.external_vendor_outgoing_payment_number?.toString(),
    vendorId: outgoingPayment?.vendor_id?.toString(),
    vendorName: outgoingPayment?.vendor_name?.toString(),
    vendorExternalId: outgoingPayment?.vendor_external_id?.toString(),
    globalVendorId: outgoingPayment?.global_vendor_id?.toString(),
    outgoingPaymentGroupId:
      outgoingPayment?.outgoing_payment_group_id?.toString(),
    paymentTransactionId: outgoingPayment?.payment_transaction_id?.toString(),
    payToAddress: outgoingPayment?.pay_to_address?.toString(),
    currencyId: outgoingPayment?.currency_id?.toString(),
    currencyExternalId: outgoingPayment?.currency_external_id?.toString(),
    cashSumAmount: Number(outgoingPayment?.cash_sum_amount),
    transferSumAmount: Number(outgoingPayment?.transfer_sum_amount),
    generalLedgerTransferAccountId:
      outgoingPayment?.general_ledger_transfer_account_id?.toString(),
    generalLedgerTransferAccountExternalId:
      outgoingPayment?.general_ledger_transfer_account_external_id?.toString(),
    transferReference: outgoingPayment?.transfer_reference?.toString(),
    bankCode: outgoingPayment?.bank_code?.toString(),
    bankAccount: outgoingPayment?.bank_account?.toString(),
    projectId: outgoingPayment?.project_id?.toString(),
    projectExternalId: outgoingPayment?.project__external_id?.toString(),
    generalLedgerWithholdingTaxAccountId:
      outgoingPayment?.general_ledger_withholding_tax_account_id?.toString(),
    generalLedgerWithholdingTaxAccountExternalId:
      outgoingPayment?.general_ledger_withholding_tax_account_external_id?.toString(),
    payToBankCode: outgoingPayment?.pay_to_bank_code?.toString(),
    payToBankBranch: outgoingPayment?.pay_to_bank_branch?.toString(),
    payToBankAccountNumber:
      outgoingPayment?.pay_to_bank_account_number?.toString(),
    payToCode: outgoingPayment?.pay_to_code?.toString(),
    payToBankCountryId: outgoingPayment?.pay_to_bank_country_id?.toString(),
    payToBankCountryExternalId:
      outgoingPayment?.pay_to_bank_country_external_id?.toString(),
    isPayToBank: Boolean(outgoingPayment?.is_pay_to_bank),
    taxDefinitionExternalId:
      outgoingPayment?.tax_definition_external_id?.toString(),
    bankChargeAmount: outgoingPayment?.bank_charge_amount?.toString(),
    bankChargeAmountInForeignCurrency:
      outgoingPayment?.bank_charge_amount_in_foreign_currency?.toString(),
    bankChargeAmountInSystemCurrency:
      outgoingPayment?.bank_charge_amount_in_system_currency?.toString(),
    underOverpaymentDifferenceAmount:
      outgoingPayment?.under_overpayment_difference_amount?.toString(),
    underOverpaymentDifferenceAmountInSystemCurrency:
      outgoingPayment?.under_overpayment_difference_amount_in_system_currency?.toString(),
    underOverpaymentDifferenceAmountInForeignCurrency:
      outgoingPayment?.under_overpayment_difference_amount_in_foreign_currency?.toString(),
    journalEntryCodeExternal:
      outgoingPayment?.journal_entry_code_external?.toString(),
    paymentType: Number(outgoingPayment?.payment_type),
    realTransferAmount: outgoingPayment?.real_transfer_amount?.toString(),
    isCanceled: Boolean(outgoingPayment?.is_canceled),
    generalLedgerControlAccountId:
      outgoingPayment?.general_ledger_control_account_id?.toString(),
    generalLedgerControlAccountExternalId:
      outgoingPayment?.general_ledger_control_account_external_id?.toString()
  };
};

const setUser = (user: any): UserType => {
  return {
    id: user?.id?.toString(),
    accountId: user?.account_id?.toString(),
    username: user?.username?.toString(),
    email: user?.email?.toString(),
    phoneNumber: user?.phone_number?.toString(),
    firstName: user?.first_name?.toString(),
    middleName: user?.middle_name?.toString(),
    lastName: user?.last_name?.toString(),
    genderId: Number(user?.gender_id),
    countryCode: user?.country_code?.toString(),
    state: user?.state?.toString(),
    city: user?.city?.toString(),
    zipCode: user?.zip_code?.toString(),
    description: user?.description?.toString(),
    createdAt: user?.created_at?.toString(),
    updatedAt: user?.updated_at?.toString(),
    createdBy: user?.created_by?.toString(),
    updatedBy: user?.updated_by?.toString()
  };
};

const setPaymentTransaction = (
  paymentTransaction: any
): PaymentTransactionType => {
  return {
    id: paymentTransaction?.id,
    description: paymentTransaction?.description,
    processorId: paymentTransaction?.processor_id,
    amount: paymentTransaction?.amount,
    paymentMethodId: paymentTransaction?.payment_method_id,
    paymentMethodType: paymentTransaction?.payment_method_type,
    status: paymentTransaction?.status,
    currency: paymentTransaction?.currency,
    ipAddress: paymentTransaction?.ip_address,
    settledAt: paymentTransaction?.settled_at,
    createdAt: paymentTransaction?.created_at,
    updatedAt: paymentTransaction?.updated_at,
    createdBy: paymentTransaction?.created_by,
    updatedBy: paymentTransaction?.updated_by
  };
};

const setCashFlow = (cashFlow: any): CashFlowType => {
  return {
    id: cashFlow?.id?.toString(),
    externalId: cashFlow?.external_id?.toString(),
    name: cashFlow?.name?.toString()
  };
};

const setStatus = (status: any): PaymentStatusType => {
  return {
    id: status?.id?.toString(),
    name: status?.name?.toString(),
    description: status?.description?.toString(),
    createdAt: status?.created_at?.toString(),
    createdBy: status?.created_by?.toString(),
    updatedAt: status?.updated_at?.toString(),
    updatedBy: status?.updated_by?.toString()
  };
};

import { Currency } from '../../../../core.v2/domain/@shared/value-objects/currency';
import { PaymentLine } from '../entity/payment-line';
import { Bill } from '../value-object/bill';
import { CashFlow } from '../value-object/cash-flow';
import { OriginAccount } from '../value-object/origin-account';
import { DestinationAccount } from '../value-object/destination-account';
import { OutgoingPayment } from '../value-object/outgoing-payment';
import { PaymentTransaction } from '../value-object/payment-transaction';
import { User } from '../value-object/user';
import { Vendor } from '../value-object/vendor';
import { PaymentLineFactoryProps } from './payment-line-factory.props';

export class PaymentLineFactory {
  public static create(props: PaymentLineFactoryProps): PaymentLine {
    const vendor = new Vendor(
      props.vendor.id,
      props.vendor.externalId,
      props.vendor.visualId,
      props.vendor.tradeName,
      props.vendor.legalName
    );

    const bill = new Bill(
      props.bill.id,
      props.bill.visualId,
      props.bill.externalId,
      props.bill.externalApInvoiceNumber,
      props.bill.referenceNumberExternal,
      props.bill.transactionContentType,
      props.bill.invoiceType,
      props.bill.postingDate,
      props.bill.dueDate,
      props.bill.invoiceTotal,
      props.bill.invoiceAuthorizationStatusId,
      props.bill.invoiceStatusId
    );

    const currency = new Currency(
      props.currency.id,
      props.currency.externalId,
      props.currency.name,
      props.currency.iso4217Alpha3,
      props.currency.symbol
    );

    const originAccount = new OriginAccount(
      props.originAccount.id,
      props.originAccount.externalId,
      props.originAccount.bankId,
      props.originAccount.bankCode,
      props.originAccount.redactedAccountNumber,
      props.originAccount.accountName,
      props.originAccount.countryId,
      props.originAccount.countryExternalId,
      props.originAccount.county,
      props.originAccount.state,
      props.originAccount.iban,
      props.originAccount.zipCode,
      props.originAccount.city,
      props.originAccount.block,
      props.originAccount.branch,
      props.originAccount.street,
      props.originAccount.currencyId,
      props.originAccount.generalLedgerAccountId,
      props.originAccount.generalLedgerAccountExternalId,
      props.originAccount.createdAt,
      props.originAccount.updatedAt,
      props.originAccount.createdBy,
      props.originAccount.updatedBy
    );

    const destinationAccount = new DestinationAccount(
      props.destinationAccount.accountName,
      props.destinationAccount.bankCode,
      props.destinationAccount.bankName,
      props.destinationAccount.redactedBankAccountNumber,
      props.destinationAccount.paymentMethodId,
      props.destinationAccount.accountAlias,
      props.destinationAccount.currencyCode,
      props.destinationAccount.vaultId,
      props.destinationAccount.vaultPaymentMethodId,
      props.destinationAccount.vaultPaymentMethodType
    );

    const requester = new User(
      props.requester.id,
      props.requester.accountId,
      props.requester.username,
      props.requester.email,
      props.requester.phoneNumber,
      props.requester.firstName,
      props.requester.middleName,
      props.requester.lastName,
      props.requester.genderId,
      props.requester.countryCode,
      props.requester.state,
      props.requester.city,
      props.requester.zipCode,
      props.requester.createdAt,
      props.requester.updatedAt,
      props.requester.createdBy,
      props.requester.updatedBy
    );

    const paymentTransaction = new PaymentTransaction(
      props.paymentTransaction.id,
      props.paymentTransaction.description,
      props.paymentTransaction.processorId,
      props.paymentTransaction.amount,
      props.paymentTransaction.paymentMethodId,
      props.paymentTransaction.paymentMethodType,
      props.paymentTransaction.status,
      props.paymentTransaction.currency,
      props.paymentTransaction.ipAddress,
      props.paymentTransaction.settledAt,
      props.paymentTransaction.createdAt,
      props.paymentTransaction.updatedAt,
      props.paymentTransaction.createdBy,
      props.paymentTransaction.updatedBy
    );

    const cashFlow = new CashFlow(
      props.cashFlow.id,
      props.cashFlow.externalId,
      props.cashFlow.name
    );

    const outgoingPayment = new OutgoingPayment(
      props.outgoingPayment.id,
      props.outgoingPayment.externalId,
      props.outgoingPayment.externalVendorOutgoingPaymentNumber,
      props.outgoingPayment.vendorId,
      props.outgoingPayment.vendorName,
      props.outgoingPayment.vendorExternalId,
      props.outgoingPayment.globalVendorId,
      props.outgoingPayment.outgoingPaymentGroupId,
      props.outgoingPayment.paymentTransactionId,
      props.outgoingPayment.payToAddress,
      props.outgoingPayment.currencyId,
      props.outgoingPayment.currencyExternalId,
      props.outgoingPayment.cashSumAmount,
      props.outgoingPayment.transferSumAmount,
      props.outgoingPayment.generalLedgerTransferAccountId,
      props.outgoingPayment.generalLedgerTransferAccountExternalId,
      props.outgoingPayment.transferReference,
      props.outgoingPayment.bankCode,
      props.outgoingPayment.bankAccount,
      props.outgoingPayment.projectId,
      props.outgoingPayment.projectExternalId,
      props.outgoingPayment.generalLedgerWithholdingTaxAccountId,
      props.outgoingPayment.generalLedgerWithholdingTaxAccountExternalId,
      props.outgoingPayment.payToBankCode,
      props.outgoingPayment.payToBankBranch,
      props.outgoingPayment.payToBankAccountNumber,
      props.outgoingPayment.payToCode,
      props.outgoingPayment.payToBankCountryId,
      props.outgoingPayment.payToBankCountryExternalId,
      props.outgoingPayment.isPayToBank,
      props.outgoingPayment.taxDefinitionExternalId,
      props.outgoingPayment.bankChargeAmount,
      props.outgoingPayment.bankChargeAmountInForeignCurrency,
      props.outgoingPayment.bankChargeAmountInSystemCurrency,
      props.outgoingPayment.underOverpaymentDifferenceAmount,
      props.outgoingPayment.underOverpaymentDifferenceAmountInSystemCurrency,
      props.outgoingPayment.underOverpaymentDifferenceAmountInForeignCurrency,
      props.outgoingPayment.journalEntryCodeExternal,
      props.outgoingPayment.paymentType,
      props.outgoingPayment.realTransferAmount,
      props.outgoingPayment.isCanceled,
      props.outgoingPayment.generalLedgerControlAccountId,
      props.outgoingPayment.generalLedgerControlAccountExternalId
    );

    return new PaymentLine(
      props.id,
      props.vendorOutgoingPaymentId,
      props.vendorOutgoingPaymentExternalId,
      props.documentId,
      props.documentType,
      props.apInvoiceExternalId,
      props.totalAmountPaidToInvoice,
      props.totalAmountPaidToInvoiceInForeignCurrency,
      props.totalAmountPaidToInvoiceInSystemCurrency,
      props.exchangeRate,
      props.discountPercent,
      props.totalAmountPaid,
      props.installmentId,
      props.installmentExternalId,
      props.withholdingTaxApplied,
      props.withholdingTaxAppliedInForeignCurrency,
      props.withholdingTaxAppliedInSystemCurrency,
      props.totalDiscount,
      props.totalDiscountInForeignCurrency,
      props.totalDiscountInSystemCurrency,
      props.createdAt,
      props.updatedAt,
      props.createdBy,
      props.updatedBy,
      props.firstPullSyncAt,
      props.lastPullSyncAt,
      props.firstPushSyncAt,
      props.lastPushSyncAt,
      vendor,
      bill,
      currency,
      originAccount,
      destinationAccount,
      outgoingPayment,
      requester,
      paymentTransaction,
      cashFlow
    );
  }
}

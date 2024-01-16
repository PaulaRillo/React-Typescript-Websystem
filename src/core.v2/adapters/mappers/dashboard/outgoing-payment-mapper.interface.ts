export type VendorRaw = {
  id: string;
  external_id: string | null;
  visual_id: string;
  trade_name: string;
  legal_name: string | null;
};

export type APInvoiceRaw = {
  id: string;
  visual_id: string;
  external_id: string;
  external_ap_invoice_number: string;
  reference_number_external: string | null;
  transaction_content_type: number;
  invoice_type: number;
  posting_date: string;
  due_date: string;
  vendor_id: string;
  vendor_external_id: string;
  vendor_trade_name: string;
  currency_id: string;
  currency_external_id: string;
  invoice_rate: number;
  notes: string;
  payment_term_id: string;
  payment_term_external_id: string;
  vendor_contact_person1_id: string | null;
  vendor_contact_person1_external_id: string;
  vendor_contact_person2_id: string | null;
  vendor_contact_person2_external_id: string;
  document_numbering_series_id: string | null;
  document_numbering_series_external_id: string;
  tax_date: string;
  ship_to_external_code: string | null;
  discount_percent: number;
  invoice_total: number;
  total_vat_tax: number;
  total_vat_tax_in_system_currency: number;
  total_vat_tax_in_foreign_currency: number;
  invoice_total_in_foreign_currency: number;
  invoice_total_in_system_currency: number;
  form_1099_external_id: string | null;
  box_1099_external_id: string | null;
  payment_method_id: string;
  payment_method_external_id: string;
  central_bank_indicator_external_id: string | null;
  is_tax_deferred: boolean;
  tax_exemption_letter_number: string | null;
  withholding_tax_applied: number;
  withholding_tax_applied_in_foreign_currency: number;
  withholding_tax_applied_in_system_currency: number;
  total_equalization_tax: number;
  total_equalization_tax_in_foreign_currency: number;
  total_equalization_tax_in_system_currency: number;
  number_of_installments: number;
  is_tax_applied_on_first_installment: boolean;
  withholding_tax_non_subject_amount: number;
  withholding_tax_non_subject_amount_in_system_currency: number;
  withholding_tax_non_subject_amount_in_foreign_currency: number;
  withholding_tax_exempted_amount: number;
  withholding_tax_exempted_amount_in_system_currency: number;
  withholding_tax_exempted_amount_in_foreign_currency: number;
  base_amount: number;
  base_amount_in_system_currency: number;
  base_amount_in_foreign_currency: number;
  withholding_tax_amount: number;
  withholding_tax_amount_in_system_currency: number;
  withholding_tax_amount_in_foreign_currency: number;
  vat_date: string | null;
  invoice_created_by: string | null;
  invoice_created_by_external: string;
  folio_prefix: string | null;
  folio_number: string | null;
  invoice_sub_type: number;
  pay_to_external_code: string;
  is_pay_to_bank: boolean;
  pay_to_bank_country: string | null;
  pay_to_bank_code: string | null;
  pay_to_bank_account_number: string | null;
  pay_to_bank_branch: string | null;
  down_payment_amount: number;
  is_reserve_invoice: boolean;
  document_closing_date: string | null;
  total_discount_amount: number;
  total_down_payment_amount: number;
  down_payment_percent: number;
  down_payment_type: string;
  total_down_payment_amount_in_system_currency: number;
  total_down_payment_amount_in_foreign_currency: number;
  vat_tax_percent: number;
  gross_profit_percent_of_service: number;
  is_rounding_applied: boolean;
  rounding_difference_amount: number;
  rounding_difference_amount_in_foreign_currency: number;
  rounding_difference_amount_in_system_currency: number;
  is_cancelled: boolean;
  general_ledger_control_account_id: string;
  general_ledger_control_account_external_id: string;
  number_of_additional_months_to_pay: number;
  number_of_additional_days_to_pay: number;
  cash_discount_date_offset: number;
  payment_due_month_start_from: number;
  down_payment_status: number;
  apply_current_vat_rates_for_down_payments_to_draw: boolean;
  closing_option: number;
  closing_date: string | null;
  total_discount_amount_in_foreign_currency: number;
  total_discount_amount_in_system_currency: number;
  cancel_status: boolean;
  fixed_asset_value_date: string;
  is_invoice_payment: boolean;
  letter: string | null;
  folio_number_from: string | null;
  folio_number_to: string | null;
  date_of_reporting_control_statement_vat: string | null;
  reporting_section_control_statement_vat: string | null;
  exclude_from_tax_report_control_statement_vat: boolean;
  original_reference_number: string | null;
  original_reference_date: string | null;
  original_credit_debit_ref_number: string | null;
  original_credit_debit_ref_date: string | null;
  tax_invoice_number: string | null;
  tax_invoice_date: string | null;
  paid_to_date_amount: number;
  paid_to_date_amount_in_foreign_currency: number;
  paid_to_date_amount_in_system_currency: number;
  origin_document_type: string | null;
  origin_document_external_id: string | null;
  invoice_authorization_status_id: number;
  invoice_status_id: number;
  additional_expenses: number;
  additional_expenses_in_system_currency: number;
  additional_expenses_in_foreign_currency: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  first_pull_sync_at: string | null;
  last_pull_sync_at: string | null;
  first_push_sync_at: string | null;
  last_push_sync_at: string | null;
};

export type CurrencyRaw = {
  id: string;
  external_id: string;
  name: string;
  symbol: string;
  iso4217_alpha3: string;
  iso4217_numeric3: string;
  is_active: boolean;
  name_on_documents: string;
  international_description: string;
  hundredth_name: string;
  english_name: string;
  english_hundredth_name: string;
  plural_international_description: null;
  plural_hundredth_name: null;
  plural_english_name: null;
  plural_english_hundredth_name: null;
  decimals: number;
  rounding: number;
  is_payment_rounded: boolean;
  maximum_incoming_amount_difference_allowed: number;
  maximum_outgoing_amount_difference_allowed: number;
  maximum_incoming_percentage_difference_allowed: null;
  maximum_outgoing_percentage_difference_allowed: null;
  is_system_managed: boolean;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  first_pull_sync_at: string | null;
  last_pull_sync_at: string;
  first_push_sync_at: string | null;
  last_push_sync_at: string | null;
  is_configured: boolean;
};

export type OriginAccountRaw = {
  payment_method_id: string;
  processor_id: string;
  bank_code: string;
  bank_name: string;
  redacted_account_number: string;
  account_name: string;
};

export type RequesterRaw = {
  id: string;
  account_id: string;
  username: string;
  email: string;
  phone_number: string | null;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  gender_id: number;
  country_code: string;
  state: string | null;
  city: string | null;
  zip_code: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  status_id: number;
};

export type PaymentTransactionRaw = {
  id: string;
  description: string;
  processor_id: string;
  amount: number;
  payment_method_id: string;
  payment_method_type: string;
  currency: string;
  ip_address: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string | null;
  captured_at: string | null;
  gateway_response: string;
  gateway_response_code: string;
  settled_at: string | null;
  status: number;
};

export type CashFlowRaw = {
  id: string;
  external_id: string;
  name: string;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  first_pull_sync_at: string | null;
  last_pull_sync_at: string;
  first_push_sync_at: string | null;
  last_push_sync_at: string | null;
};

export type OutgoingPaymentRaw = {
  id: string;
  external_id: string | null;
  external_vendor_outgoing_payment_number: string | null;
  vendor_id: string;
  vendor_name: string | null;
  vendor_external_id: string;
  global_vendor_id: string | null;
  payment_transaction_id: string;
  pay_to_address: string | null;
  currency_id: string;
  currency_external_id: string;
  cash_sum_amount: number;
  transfer_sum_amount: number;
  general_ledger_transfer_account_id: string;
  general_ledger_transfer_account_external_id: string;
  transfer_reference: string;
  enter_in_local_currency: boolean;
  exchange_rate: number;
  reference1: string;
  reference2: string;
  notes: string;
  journal_note: string;
  split_transaction: boolean;
  apply_vat_tax: boolean;
  document_numbering_series_id: string | null;
  document_numbering_series_external_id: string | null;
  bank_code: string | null;
  bank_account: string | null;
  discount_percentage: number | null;
  project_id: string | null;
  project__external_id: string | null;
  deduction_percentage: number | null;
  total_deduction_amount: number | null;
  cash_amount_in_foreign_currency: number | null;
  cash_amount_in_system_currency: number | null;
  withholding_tax_external_id: string | null;
  withholding_tax_amount: number | null;
  withholding_tax_in_foreign_currency: number | null;
  withholding_tax_in_system_currency: number | null;
  withholding_tax_taxable_amount: number | null;
  withholding_tax_base_sum: number | null;
  withholding_tax_base_sum_in_foreign_currency: number | null;
  withholding_tax_base_sum_in_system_currency: number | null;
  general_ledger_withholding_tax_account_id: string | null;
  general_ledger_withholding_tax_account_external_id: string | null;
  pay_to_bank_code: string | null;
  pay_to_bank_branch: string | null;
  pay_to_bank_account_number: string | null;
  pay_to_code: string | null;
  pay_to_bank_country_id: string | null;
  pay_to_bank_country_external_id: string | null;
  is_pay_to_bank: boolean;
  tax_definition_external_id: string | null;
  bank_charge_amount: number | null;
  bank_charge_amount_in_foreign_currency: number | null;
  bank_charge_amount_in_system_currency: number | null;
  under_overpayment_difference_amount: number | null;
  under_overpayment_difference_amount_in_system_currency: number | null;
  under_overpayment_difference_amount_in_foreign_currency: number | null;
  journal_entry_code_external: string | null;
  payment_type: number;
  real_transfer_amount: number | null;
  is_canceled: boolean;
  general_ledger_control_account_id: string | null;
  general_ledger_control_account_external_id: string | null;
  business_place_id: string | null;
  business_place_external_id: string | null;
  outgoing_payment_group_id: string;
  branch_name: string | null;
  vat_tax_registration_number: string | null;
  vat_tax_date: string | null;
  posting_date: string;
  due_date: string;
  transfer_date: string;
  tax_date: string;
  cash_flow_id: string;
  cash_flow_external_id: string;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  first_pull_sync_at: string | null;
  last_pull_sync_at: string | null;
  first_push_sync_at: string | null;
  last_push_sync_at: string | null;
};

export type StatusRaw = {
  id: number;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
};

export type OutgoingPaymentLineRaw = {
  id: string;
  vendor_outgoing_payment_id: string;
  vendor_outgoing_payment_external_id: string | null;
  document_id: string;
  document_type: number;
  ap_invoice_external_id: string;
  total_amount_paid_to_invoice: number;
  total_amount_paid_to_invoice_in_foreign_currency: number;
  total_amount_paid_to_invoice_in_system_currency: number;
  exchange_rate: number;
  discount_percent: number;
  total_amount_paid: number;
  installment_id: string | null;
  installment_external_id: string | null;
  withholding_tax_applied: number;
  withholding_tax_applied_in_foreign_currency: number;
  withholding_tax_applied_in_system_currency: number;
  total_discount: number;
  total_discount_in_foreign_currency: number;
  total_discount_in_system_currency: number;
  created_at: string;
  updated_at: string | null;
  created_by: string;
  updated_by: string | null;
  first_pull_sync_at: string | null;
  last_pull_sync_at: string | null;
  first_push_sync_at: string | null;
  last_push_sync_at: string | null;
  vendor: VendorRaw;
  ap_invoice: APInvoiceRaw;
  currency: CurrencyRaw;
  origin_account: OriginAccountRaw;
  requester: RequesterRaw;
  payment_transaction: PaymentTransactionRaw;
  cash_flow: CashFlowRaw;
  outgoing_payment: OutgoingPaymentRaw;
  balance_due: number;
  status: StatusRaw;
};

export type OutgoingPaymentDashboardRaw = {
  code: 'OPL';
  name: 'Outgoing Payment Lines';
  description: 'Showing the last 3 months of outgoing payment lines';
  generated_at: string;
  count: number;
  amount: string;
  data: OutgoingPaymentLineRaw[];
};

/// DOMAIN

export type VendorDomain = {
  id: string;
  externalId: string | null;
  visualId: string;
  tradeName: string;
  legalName: string | null;
};

export type APInvoiceDomain = {
  id: string;
  visualId: string;
  externalId: string;
  externalApInvoiceNumber: string;
  referenceNumberExternal: string | null;
  transactionContentType: number;
  invoiceType: number;
  postingDate: string;
  dueDate: string;
  vendorId: string;
  vendorExternalId: string;
  vendorTradeName: string;
  currencyId: string;
  currencyExternalId: string;
  invoiceRate: number;
  notes: string;
  paymentTermId: string;
  paymentTermExternalId: string;
  vendorContactPerson1Id: string | null;
  vendorContactPerson1ExternalId: string;
  vendorContactPerson2Id: string | null;
  vendorContactPerson2ExternalId: string;
  documentNumberingSeriesId: string | null;
  documentNumberingSeriesExternalId: string;
  taxDate: string;
  shipToExternalCode: string | null;
  discountPercent: number;
  invoiceTotal: number;
  totalVatTax: number;
  totalVatTaxInSystemCurrency: number;
  totalVatTaxInForeignCurrency: number;
  invoiceTotalInForeignCurrency: number;
  invoiceTotalInSystemCurrency: number;
  form1099ExternalId: string | null;
  box1099ExternalId: string | null;
  paymentMethodId: string;
  paymentMethodExternalId: string;
  centralBankIndicatorExternalId: string | null;
  isTaxDeferred: boolean;
  taxExemptionLetterNumber: string | null;
  withholdingTaxApplied: number;
  withholdingTaxAppliedInForeignCurrency: number;
  withholdingTaxAppliedInSystemCurrency: number;
  totalEqualizationTax: number;
  totalEqualizationTaxInForeignCurrency: number;
  totalEqualizationTaxInSystemCurrency: number;
  numberOfInstallments: number;
  isTaxAppliedOnFirstInstallment: boolean;
  withholdingTaxNonSubjectAmount: number;
  withholdingTaxNonSubjectAmountInSystemCurrency: number;
  withholdingTaxNonSubjectAmountInForeignCurrency: number;
  withholdingTaxExemptedAmount: number;
  withholdingTaxExemptedAmountInSystemCurrency: number;
  withholdingTaxExemptedAmountInForeignCurrency: number;
  baseAmount: number;
  baseAmountInSystemCurrency: number;
  baseAmountInForeignCurrency: number;
  withholdingTaxAmount: number;
  withholdingTaxAmountInSystemCurrency: number;
  withholdingTaxAmountInForeignCurrency: number;
  vatDate: string | null;
  invoiceCreatedBy: string | null;
  invoiceCreatedByExternal: string;
  folioPrefix: string | null;
  folioNumber: string | null;
  invoiceSubType: number;
  payToExternalCode: string;
  isPayToBank: boolean;
  payToBankCountry: string | null;
  payToBankCode: string | null;
  payToBankAccountNumber: string | null;
  payToBankBranch: string | null;
  downPaymentAmount: number;
  isReserveInvoice: boolean;
  documentClosingDate: string | null;
  totalDiscountAmount: number;
  totalDownPaymentAmount: number;
  downPaymentPercent: number;
  downPaymentType: string;
  totalDownPaymentAmountInSystemCurrency: number;
  totalDownPaymentAmountInForeignCurrency: number;
  vatTaxPercent: number;
  grossProfitPercentOfService: number;
  isRoundingApplied: boolean;
  roundingDifferenceAmount: number;
  roundingDifferenceAmountInForeignCurrency: number;
  roundingDifferenceAmountInSystemCurrency: number;
  isCancelled: boolean;
  generalLedgerControlAccountId: string;
  generalLedgerControlAccountExternalId: string;
  numberOfAdditionalMonthsToPay: number;
  numberOfAdditionalDaysToPay: number;
  cashDiscountDateOffset: number;
  paymentDueMonthStartFrom: number;
  downPaymentStatus: number;
  applyCurrentVatRatesForDownPaymentsToDraw: boolean;
  closingOption: number;
  closingDate: string | null;
  totalDiscountAmountInForeignCurrency: number;
  totalDiscountAmountInSystemCurrency: number;
  cancelStatus: boolean;
  fixedAssetValueDate: string;
  isInvoicePayment: boolean;
  letter: string | null;
  folioNumberFrom: string | null;
  folioNumberTo: string | null;
  dateOfReportingControlStatementVat: string | null;
  reportingSectionControlStatementVat: string | null;
  excludeFromTaxReportControlStatementVat: boolean;
  originalReferenceNumber: string | null;
  originalReferenceDate: string | null;
  originalCreditDebitRefNumber: string | null;
  originalCreditDebitRefDate: string | null;
  taxInvoiceNumber: string | null;
  taxInvoiceDate: string | null;
  paidToDateAmount: number;
  paidToDateAmountInForeignCurrency: number;
  paidToDateAmountInSystemCurrency: number;
  originDocumentType: string | null;
  originDocumentExternalId: string | null;
  invoiceAuthorizationStatusId: number;
  invoiceStatusId: number;
  additionalExpenses: number;
  additionalExpensesInSystemCurrency: number;
  additionalExpensesInForeignCurrency: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  firstPullSyncAt: string | null;
  lastPullSyncAt: string;
  firstPushSyncAt: string | null;
  lastPushSyncAt: string | null;
};

export type CurrencyDomain = {
  id: string;
  externalId: string;
  name: string;
  symbol: string;
  iso4217Alpha3: string;
  iso4217Numeric3: string;
  isActive: boolean;
  nameOnDocuments: string;
  internationalDescription: string;
  hundredthName: string;
  englishName: string;
  englishHundredthName: string;
  pluralInternationalDescription: null;
  pluralHundredthName: null;
  pluralEnglishName: null;
  pluralEnglishHundredthName: null;
  decimals: number;
  rounding: number;
  isPaymentRounded: boolean;
  maximumIncomingAmountDifferenceAllowed: number;
  maximumOutgoingAmountDifferenceAllowed: number;
  maximumIncomingPercentageDifferenceAllowed: null;
  maximumOutgoingPercentageDifferenceAllowed: null;
  isSystemManaged: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  firstPullSyncAt: string | null;
  lastPullSyncAt: string;
  firstPushSyncAt: string | null;
  lastPushSyncAt: string | null;
  isConfigured: boolean;
};

export type OriginAccountDomain = {
  paymentMethodId: string;
  processorId: string;
  bankCode: string;
  bankName: string;
  redactedAccountNumber: string;
  accountName: string;
};

export type RequesterDomain = {
  id: string;
  accountId: string;
  username: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string;
  genderId: number;
  countryCode: string;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  statusId: number;
};

export type PaymentTransactionDomain = {
  id: string;
  description: string;
  processorId: string;
  amount: number;
  paymentMethodId: string;
  paymentMethodType: string;
  currency: string;
  ipAddress: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string | null;
  capturedAt: string | null;
  gatewayResponse: string;
  gatewayResponseCode: string;
  settledAt: string | null;
  status: number;
};

export type CashFlowDomain = {
  id: string;
  externalId: string;
  name: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  firstPullSyncAt: string | null;
  lastPullSyncAt: string;
  firstPushSyncAt: string | null;
  lastPushSyncAt: string | null;
};

export type OutgoingPaymentDomain = {
  id: string;
  externalId: string | null;
  externalVendorOutgoingPaymentNumber: string | null;
  vendorId: string;
  vendorExternalId: string;
  globalVendorId: string | null;
  paymentTransactionId: string;
  payToAddress: string | null;
  currencyId: string;
  currencyExternalId: string;
  cashSumAmount: number;
  transferSumAmount: number;
  generalLedgerTransferAccountId: string;
  generalLedgerTransferAccountExternalId: string;
  transferReference: string;
  enterInLocalCurrency: boolean;
  exchangeRate: number;
  reference1: string;
  reference2: string;
  notes: string;
  journalNote: string;
  splitTransaction: boolean;
  applyVATTax: boolean;
  documentNumberingSeriesId: string | null;
  documentNumberingSeriesExternalId: string | null;
  bankCode: string | null;
  bankAccount: string | null;
  discountPercentage: number | null;
  projectId: string | null;
  projectExternalId: string | null;
  deductionPercentage: number | null;
  totalDeductionAmount: number | null;
  cashAmountInForeignCurrency: number | null;
  cashAmountInSystemCurrency: number | null;
  withholdingTaxExternalId: string | null;
  withholdingTaxAmount: number | null;
  withholdingTaxInForeignCurrency: number | null;
  withholdingTaxInSystemCurrency: number | null;
  withholdingTaxTaxableAmount: number | null;
  withholdingTaxBaseSum: number | null;
  withholdingTaxBaseSumInForeignCurrency: number | null;
  withholdingTaxBaseSumInSystemCurrency: number | null;
  generalLedgerWithholdingTaxAccountId: string | null;
  generalLedgerWithholdingTaxAccountExternalId: string | null;
  payToBankCode: string | null;
  payToBankBranch: string | null;
  payToBankAccountNumber: string | null;
  payToCode: string | null;
  payToBankCountryId: string | null;
  payToBankCountryExternalId: string | null;
  isPayToBank: boolean;
  taxDefinitionExternalId: string | null;
  bankChargeAmount: number | null;
  bankChargeAmountInForeignCurrency: number | null;
  bankChargeAmountInSystemCurrency: number | null;
  underOverpaymentDifferenceAmount: number | null;
  underOverpaymentDifferenceAmountInSystemCurrency: number | null;
  underOverpaymentDifferenceAmountInForeignCurrency: number | null;
  journalEntryCodeExternal: string | null;
  paymentType: number;
  realTransferAmount: number | null;
  isCanceled: boolean;
  generalLedgerControlAccountId: string | null;
  generalLedgerControlAccountExternalId: string | null;
  businessPlaceId: string | null;
  businessPlaceExternalId: string | null;
  outgoingPaymentGroupId: string;
  branchName: string | null;
  vatTaxRegistrationNumber: string | null;
  vatTaxDate: string | null;
  postingDate: string;
  dueDate: string;
  transferDate: string;
  taxDate: string;
  cashFlowId: string;
  cashFlowExternalId: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  firstPullSyncAt: string | null;
  lastPullSyncAt: string | null;
  firstPushSyncAt: string | null;
  lastPushSyncAt: string | null;
};

export type ProjectDomain = null;

export type StatusDomain = {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
};

export type OutgoingPaymentLineDomain = {
  id: string;
  vendorOutgoingPaymentId: string;
  vendorOutgoingPaymentExternalId: string | null;
  documentId: string;
  documentType: number;
  apInvoiceExternalId: string;
  totalAmountPaidToInvoice: number;
  totalAmountPaidToInvoiceInForeignCurrency: number;
  totalAmountPaidToInvoiceInSystemCurrency: number;
  exchangeRate: number;
  discountPercent: number;
  totalAmountPaid: number;
  installmentId: string | null;
  installmentExternalId: string | null;
  withholdingTaxApplied: number;
  withholdingTaxAppliedInForeignCurrency: number;
  withholdingTaxAppliedInSystemCurrency: number;
  totalDiscount: number;
  totalDiscountInForeignCurrency: number;
  totalDiscountInSystemCurrency: number;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  firstPullSyncAt: string | null;
  lastPullSyncAt: string | null;
  firstPushSyncAt: string | null;
  lastPushSyncAt: string | null;
  vendor: VendorDomain;
  apInvoice: APInvoiceDomain;
  currency: CurrencyDomain;
  originAccount: OriginAccountDomain;
  requester: RequesterDomain;
  paymentTransaction: PaymentTransactionDomain;
  cashFlow: CashFlowDomain;
  outgoingPayment: OutgoingPaymentDomain;
  balanceDue: number;
  status: StatusDomain;
};

export type OutgoingPaymentDashboardDomain = {
  code: 'OPL';
  name: 'Outgoing Payment Lines';
  description: 'Showing the last 3 months of outgoing payment lines';
  generatedAt: string;
  count: number;
  amount: string;
  data: OutgoingPaymentLineDomain[];
};
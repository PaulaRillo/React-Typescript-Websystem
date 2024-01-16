import {
  APInvoiceDomain,
  APInvoiceRaw,
  CashFlowDomain,
  CashFlowRaw,
  CurrencyDomain,
  CurrencyRaw,
  OriginAccountDomain,
  OriginAccountRaw,
  OutgoingPaymentDashboardDomain,
  OutgoingPaymentDashboardRaw,
  OutgoingPaymentDomain,
  OutgoingPaymentLineDomain,
  OutgoingPaymentLineRaw,
  OutgoingPaymentRaw,
  PaymentTransactionDomain,
  PaymentTransactionRaw,
  RequesterDomain,
  RequesterRaw,
  StatusDomain,
  StatusRaw,
  VendorDomain,
  VendorRaw
} from './outgoing-payment-mapper.interface';

export class OutgoingPaymentMapper {
  public static toDomain(
    dto: OutgoingPaymentDashboardRaw
  ): OutgoingPaymentDashboardDomain {
    return {
      code: dto.code,
      name: dto.name,
      description: dto.description,
      generatedAt: dto.generated_at,
      count: dto.count,
      amount: dto.amount,
      data: dto.data
        ? dto.data.map((item) => this.mapOutgoingPaymentLine(item))
        : []
    };
  }

  private static mapOutgoingPaymentLine(
    item: OutgoingPaymentLineRaw
  ): OutgoingPaymentLineDomain {
    return {
      id: item.id,
      vendorOutgoingPaymentId: item.vendor_outgoing_payment_id,
      vendorOutgoingPaymentExternalId: item.vendor_outgoing_payment_external_id,
      documentId: item.document_id,
      documentType: item.document_type,
      apInvoiceExternalId: item.ap_invoice_external_id,
      totalAmountPaidToInvoice: item.total_amount_paid_to_invoice,
      totalAmountPaidToInvoiceInForeignCurrency:
        item.total_amount_paid_to_invoice_in_foreign_currency,
      totalAmountPaidToInvoiceInSystemCurrency:
        item.total_amount_paid_to_invoice_in_system_currency,
      exchangeRate: item.exchange_rate,
      discountPercent: item.discount_percent,
      totalAmountPaid: item.total_amount_paid,
      installmentId: item.installment_id,
      installmentExternalId: item.installment_external_id,
      withholdingTaxApplied: item.withholding_tax_applied,
      withholdingTaxAppliedInForeignCurrency:
        item.withholding_tax_applied_in_foreign_currency,
      withholdingTaxAppliedInSystemCurrency:
        item.withholding_tax_applied_in_system_currency,
      totalDiscount: item.total_discount,
      totalDiscountInForeignCurrency: item.total_discount_in_foreign_currency,
      totalDiscountInSystemCurrency: item.total_discount_in_system_currency,
      createdAt: item.created_at,
      updatedAt: item.updated_at ?? null,
      createdBy: item.created_by,
      updatedBy: item.updated_by ?? null,
      firstPullSyncAt: item.first_pull_sync_at ?? null,
      lastPullSyncAt: item.last_pull_sync_at ?? null,
      firstPushSyncAt: item.first_push_sync_at ?? null,
      lastPushSyncAt: item.last_push_sync_at ?? null,
      vendor: this.mapVendor(item.vendor),
      apInvoice: this.mapAPInvoice(item.ap_invoice),
      currency: this.mapCurrency(item.currency),
      originAccount: this.mapOriginAccount(item.origin_account),
      requester: this.mapRequester(item.requester),
      paymentTransaction: this.mapPaymentTransaction(item.payment_transaction),
      cashFlow: this.mapCashFlow(item.cash_flow),
      outgoingPayment: this.mapOutgoingPayment(item.outgoing_payment),
      balanceDue: item.balance_due,
      status: this.mapStatus(item.status)
    };
  }

  private static mapVendor(item: VendorRaw): VendorDomain {
    return {
      id: item.id,
      externalId: item.external_id,
      visualId: item.visual_id,
      tradeName: item.trade_name,
      legalName: item.legal_name
    };
  }

  private static mapAPInvoice(item: APInvoiceRaw): APInvoiceDomain {
    return {
      id: item.id,
      visualId: item.visual_id,
      externalId: item.external_id,
      externalApInvoiceNumber: item.external_ap_invoice_number,
      referenceNumberExternal: item.reference_number_external,
      transactionContentType: item.transaction_content_type,
      invoiceType: item.invoice_type,
      postingDate: item.posting_date,
      dueDate: item.due_date,
      vendorId: item.vendor_id,
      vendorExternalId: item.vendor_external_id,
      vendorTradeName: item.vendor_trade_name,
      currencyId: item.currency_id,
      currencyExternalId: item.currency_external_id,
      invoiceRate: item.invoice_rate,
      notes: item.notes,
      paymentTermId: item.payment_term_id,
      paymentTermExternalId: item.payment_term_external_id,
      vendorContactPerson1Id: item.vendor_contact_person1_id,
      vendorContactPerson1ExternalId: item.vendor_contact_person1_external_id,
      vendorContactPerson2Id: item.vendor_contact_person2_id,
      vendorContactPerson2ExternalId: item.vendor_contact_person2_external_id,
      documentNumberingSeriesId: item.document_numbering_series_id,
      documentNumberingSeriesExternalId:
        item.document_numbering_series_external_id,
      taxDate: item.tax_date,
      shipToExternalCode: item.ship_to_external_code,
      discountPercent: item.discount_percent,
      invoiceTotal: item.invoice_total,
      totalVatTax: item.total_vat_tax,
      totalVatTaxInSystemCurrency: item.total_vat_tax_in_system_currency,
      totalVatTaxInForeignCurrency: item.total_vat_tax_in_foreign_currency,
      invoiceTotalInForeignCurrency: item.invoice_total_in_foreign_currency,
      invoiceTotalInSystemCurrency: item.invoice_total_in_system_currency,
      form1099ExternalId: item.form_1099_external_id,
      box1099ExternalId: item.box_1099_external_id,
      paymentMethodId: item.payment_method_id,
      paymentMethodExternalId: item.payment_method_external_id,
      centralBankIndicatorExternalId: item.central_bank_indicator_external_id,
      isTaxDeferred: item.is_tax_deferred,
      taxExemptionLetterNumber: item.tax_exemption_letter_number,
      withholdingTaxApplied: item.withholding_tax_applied,
      withholdingTaxAppliedInForeignCurrency:
        item.withholding_tax_applied_in_foreign_currency,
      withholdingTaxAppliedInSystemCurrency:
        item.withholding_tax_applied_in_system_currency,
      totalEqualizationTax: item.total_equalization_tax,
      totalEqualizationTaxInForeignCurrency:
        item.total_equalization_tax_in_foreign_currency,
      totalEqualizationTaxInSystemCurrency:
        item.total_equalization_tax_in_system_currency,
      numberOfInstallments: item.number_of_installments,
      isTaxAppliedOnFirstInstallment: item.is_tax_applied_on_first_installment,
      withholdingTaxNonSubjectAmount: item.withholding_tax_non_subject_amount,
      withholdingTaxNonSubjectAmountInSystemCurrency:
        item.withholding_tax_non_subject_amount_in_system_currency,
      withholdingTaxNonSubjectAmountInForeignCurrency:
        item.withholding_tax_non_subject_amount_in_foreign_currency,
      withholdingTaxExemptedAmount: item.withholding_tax_exempted_amount,
      withholdingTaxExemptedAmountInSystemCurrency:
        item.withholding_tax_exempted_amount_in_system_currency,
      withholdingTaxExemptedAmountInForeignCurrency:
        item.withholding_tax_exempted_amount_in_foreign_currency,
      baseAmount: item.base_amount,
      baseAmountInSystemCurrency: item.base_amount_in_system_currency,
      baseAmountInForeignCurrency: item.base_amount_in_foreign_currency,
      withholdingTaxAmount: item.withholding_tax_amount,
      withholdingTaxAmountInSystemCurrency:
        item.withholding_tax_amount_in_system_currency,
      withholdingTaxAmountInForeignCurrency:
        item.withholding_tax_amount_in_foreign_currency,
      vatDate: item.vat_date,
      invoiceCreatedBy: item.invoice_created_by,
      invoiceCreatedByExternal: item.invoice_created_by_external,
      folioPrefix: item.folio_prefix,
      folioNumber: item.folio_number,
      invoiceSubType: item.invoice_sub_type,
      payToExternalCode: item.pay_to_external_code,
      isPayToBank: item.is_pay_to_bank,
      payToBankCountry: item.pay_to_bank_country,
      payToBankCode: item.pay_to_bank_code,
      payToBankAccountNumber: item.pay_to_bank_account_number,
      payToBankBranch: item.pay_to_bank_branch,
      downPaymentAmount: item.down_payment_amount,
      isReserveInvoice: item.is_reserve_invoice,
      documentClosingDate: item.document_closing_date,
      totalDiscountAmount: item.total_discount_amount,
      totalDownPaymentAmount: item.total_down_payment_amount,
      downPaymentPercent: item.down_payment_percent,
      downPaymentType: item.down_payment_type,
      totalDownPaymentAmountInSystemCurrency:
        item.total_down_payment_amount_in_system_currency,
      totalDownPaymentAmountInForeignCurrency:
        item.total_down_payment_amount_in_foreign_currency,
      vatTaxPercent: item.vat_tax_percent,
      grossProfitPercentOfService: item.gross_profit_percent_of_service,
      isRoundingApplied: item.is_rounding_applied,
      roundingDifferenceAmount: item.rounding_difference_amount,
      roundingDifferenceAmountInForeignCurrency:
        item.rounding_difference_amount_in_foreign_currency,
      roundingDifferenceAmountInSystemCurrency:
        item.rounding_difference_amount_in_system_currency,
      isCancelled: item.is_cancelled,
      generalLedgerControlAccountId: item.general_ledger_control_account_id,
      generalLedgerControlAccountExternalId:
        item.general_ledger_control_account_external_id,
      numberOfAdditionalMonthsToPay: item.number_of_additional_months_to_pay,
      numberOfAdditionalDaysToPay: item.number_of_additional_days_to_pay,
      cashDiscountDateOffset: item.cash_discount_date_offset,
      paymentDueMonthStartFrom: item.payment_due_month_start_from,
      downPaymentStatus: item.down_payment_status,
      applyCurrentVatRatesForDownPaymentsToDraw:
        item.apply_current_vat_rates_for_down_payments_to_draw,
      closingOption: item.closing_option,
      closingDate: item.closing_date,
      totalDiscountAmountInForeignCurrency:
        item.total_discount_amount_in_foreign_currency,
      totalDiscountAmountInSystemCurrency:
        item.total_discount_amount_in_system_currency,
      cancelStatus: item.cancel_status,
      fixedAssetValueDate: item.fixed_asset_value_date,
      isInvoicePayment: item.is_invoice_payment,
      letter: item.letter,
      folioNumberFrom: item.folio_number_from,
      folioNumberTo: item.folio_number_to,
      dateOfReportingControlStatementVat:
        item.date_of_reporting_control_statement_vat,
      reportingSectionControlStatementVat:
        item.reporting_section_control_statement_vat,
      excludeFromTaxReportControlStatementVat:
        item.exclude_from_tax_report_control_statement_vat,
      originalReferenceNumber: item.original_reference_number,
      originalReferenceDate: item.original_reference_date,
      originalCreditDebitRefNumber: item.original_credit_debit_ref_number,
      originalCreditDebitRefDate: item.original_credit_debit_ref_date,
      taxInvoiceNumber: item.tax_invoice_number,
      taxInvoiceDate: item.tax_invoice_date,
      paidToDateAmount: item.paid_to_date_amount,
      paidToDateAmountInForeignCurrency:
        item.paid_to_date_amount_in_foreign_currency,
      paidToDateAmountInSystemCurrency:
        item.paid_to_date_amount_in_system_currency,
      originDocumentType: item.origin_document_type,
      originDocumentExternalId: item.origin_document_external_id,
      invoiceAuthorizationStatusId: item.invoice_authorization_status_id,
      invoiceStatusId: item.invoice_status_id,
      additionalExpenses: item.additional_expenses,
      additionalExpensesInSystemCurrency:
        item.additional_expenses_in_system_currency,
      additionalExpensesInForeignCurrency:
        item.additional_expenses_in_foreign_currency,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      firstPullSyncAt: item.first_pull_sync_at,
      lastPullSyncAt: item.last_pull_sync_at || '',
      firstPushSyncAt: item.first_push_sync_at,
      lastPushSyncAt: item.last_push_sync_at
    };
  }

  private static mapCurrency(item: CurrencyRaw): CurrencyDomain {
    return {
      id: item.id,
      externalId: item.external_id,
      name: item.name,
      symbol: item.symbol,
      iso4217Alpha3: item.iso4217_alpha3,
      iso4217Numeric3: item.iso4217_numeric3,
      isActive: item.is_active,
      nameOnDocuments: item.name_on_documents,
      internationalDescription: item.international_description,
      hundredthName: item.hundredth_name,
      englishName: item.english_name,
      englishHundredthName: item.english_hundredth_name,
      pluralInternationalDescription: item.plural_international_description,
      pluralHundredthName: item.plural_hundredth_name,
      pluralEnglishName: item.plural_english_name,
      pluralEnglishHundredthName: item.plural_english_hundredth_name,
      decimals: item.decimals,
      rounding: item.rounding,
      isPaymentRounded: item.is_payment_rounded,
      maximumIncomingAmountDifferenceAllowed:
        item.maximum_incoming_amount_difference_allowed,
      maximumOutgoingAmountDifferenceAllowed:
        item.maximum_outgoing_amount_difference_allowed,
      maximumIncomingPercentageDifferenceAllowed:
        item.maximum_incoming_percentage_difference_allowed,
      maximumOutgoingPercentageDifferenceAllowed:
        item.maximum_outgoing_percentage_difference_allowed,
      isSystemManaged: item.is_system_managed,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      firstPullSyncAt: item.first_pull_sync_at,
      lastPullSyncAt: item.last_pull_sync_at,
      firstPushSyncAt: item.first_push_sync_at,
      lastPushSyncAt: item.last_push_sync_at,
      isConfigured: item.is_configured
    };
  }

  private static mapOriginAccount(item: OriginAccountRaw): OriginAccountDomain {
    return {
      paymentMethodId: item.payment_method_id,
      processorId: item.processor_id,
      bankCode: item.bank_code,
      bankName: item.bank_name,
      redactedAccountNumber: item.redacted_account_number,
      accountName: item.account_name
    };
  }

  private static mapRequester(item: RequesterRaw): RequesterDomain {
    return {
      id: item.id,
      accountId: item.account_id,
      username: item.username,
      email: item.email,
      phoneNumber: item.phone_number,
      firstName: item.first_name,
      middleName: item.middle_name,
      lastName: item.last_name,
      genderId: item.gender_id,
      countryCode: item.country_code,
      state: item.state,
      city: item.city,
      statusId: item.status_id,
      zipCode: item.zip_code,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
      createdBy: item.created_by,
      updatedBy: item.updated_by
    };
  }

  private static mapPaymentTransaction(
    item: PaymentTransactionRaw
  ): PaymentTransactionDomain {
    return {
      id: item.id,
      description: item.description,
      processorId: item.processor_id,
      amount: item.amount,
      paymentMethodId: item.payment_method_id,
      paymentMethodType: item.payment_method_type,
      currency: item.currency,
      ipAddress: item.ip_address,
      createdAt: item.created_at,
      updatedAt: item.updated_at ?? '',
      createdBy: item.created_by,
      updatedBy: item.updated_by ?? null,
      capturedAt: item.captured_at ?? null,
      gatewayResponse: item.gateway_response,
      gatewayResponseCode: item.gateway_response_code,
      settledAt: item.settled_at ?? null,
      status: item.status
    };
  }

  private static mapCashFlow(item: CashFlowRaw): CashFlowDomain {
    return {
      id: item.id,
      externalId: item.external_id,
      name: item.name,
      createdAt: item.created_at,
      updatedAt: item.updated_at ?? null,
      createdBy: item.created_by,
      updatedBy: item.updated_by ?? null,
      firstPullSyncAt: item.first_pull_sync_at ?? null,
      lastPullSyncAt: item.last_pull_sync_at,
      firstPushSyncAt: item.first_push_sync_at ?? null,
      lastPushSyncAt: item.last_push_sync_at ?? null
    };
  }

  private static mapOutgoingPayment(
    item: OutgoingPaymentRaw
  ): OutgoingPaymentDomain {
    return {
      id: item.id,
      externalId: item.external_id ?? null,
      externalVendorOutgoingPaymentNumber:
        item.external_vendor_outgoing_payment_number ?? null,
      vendorId: item.vendor_id,
      vendorExternalId: item.vendor_external_id,
      globalVendorId: item.global_vendor_id ?? null,
      paymentTransactionId: item.payment_transaction_id,
      payToAddress: item.pay_to_address ?? null,
      currencyId: item.currency_id,
      currencyExternalId: item.currency_external_id,
      cashSumAmount: item.cash_sum_amount,
      transferSumAmount: item.transfer_sum_amount,
      generalLedgerTransferAccountId: item.general_ledger_transfer_account_id,
      generalLedgerTransferAccountExternalId:
        item.general_ledger_transfer_account_external_id,
      transferReference: item.transfer_reference,
      enterInLocalCurrency: item.enter_in_local_currency,
      exchangeRate: item.exchange_rate,
      reference1: item.reference1,
      reference2: item.reference2,
      notes: item.notes,
      journalNote: item.journal_note,
      splitTransaction: item.split_transaction,
      applyVATTax: item.apply_vat_tax,
      documentNumberingSeriesId: item.document_numbering_series_id ?? null,
      documentNumberingSeriesExternalId:
        item.document_numbering_series_external_id ?? null,
      bankCode: item.bank_code ?? null,
      bankAccount: item.bank_account ?? null,
      discountPercentage: item.discount_percentage ?? null,
      projectId: item.project_id ?? null,
      projectExternalId: item.project__external_id ?? null,
      deductionPercentage: item.deduction_percentage ?? null,
      totalDeductionAmount: item.total_deduction_amount ?? null,
      cashAmountInForeignCurrency: item.cash_amount_in_foreign_currency ?? null,
      cashAmountInSystemCurrency: item.cash_amount_in_system_currency ?? null,
      withholdingTaxExternalId: item.withholding_tax_external_id ?? null,
      withholdingTaxAmount: item.withholding_tax_amount ?? null,
      withholdingTaxInForeignCurrency:
        item.withholding_tax_in_foreign_currency ?? null,
      withholdingTaxInSystemCurrency:
        item.withholding_tax_in_system_currency ?? null,
      withholdingTaxTaxableAmount: item.withholding_tax_taxable_amount ?? null,
      withholdingTaxBaseSum: item.withholding_tax_base_sum ?? null,
      withholdingTaxBaseSumInForeignCurrency:
        item.withholding_tax_base_sum_in_foreign_currency ?? null,
      withholdingTaxBaseSumInSystemCurrency:
        item.withholding_tax_base_sum_in_system_currency ?? null,
      generalLedgerWithholdingTaxAccountId:
        item.general_ledger_withholding_tax_account_id ?? null,
      generalLedgerWithholdingTaxAccountExternalId:
        item.general_ledger_withholding_tax_account_external_id ?? null,
      payToBankCode: item.pay_to_bank_code ?? null,
      payToBankBranch: item.pay_to_bank_branch ?? null,
      payToBankAccountNumber: item.pay_to_bank_account_number ?? null,
      payToCode: item.pay_to_code ?? null,
      payToBankCountryId: item.pay_to_bank_country_id ?? null,
      payToBankCountryExternalId: item.pay_to_bank_country_external_id ?? null,
      isPayToBank: item.is_pay_to_bank,
      taxDefinitionExternalId: item.tax_definition_external_id ?? null,
      bankChargeAmount: item.bank_charge_amount ?? null,
      bankChargeAmountInForeignCurrency:
        item.bank_charge_amount_in_foreign_currency ?? null,
      bankChargeAmountInSystemCurrency:
        item.bank_charge_amount_in_system_currency ?? null,
      underOverpaymentDifferenceAmount:
        item.under_overpayment_difference_amount ?? null,
      underOverpaymentDifferenceAmountInSystemCurrency:
        item.under_overpayment_difference_amount_in_system_currency ?? null,
      underOverpaymentDifferenceAmountInForeignCurrency:
        item.under_overpayment_difference_amount_in_foreign_currency ?? null,
      journalEntryCodeExternal: item.journal_entry_code_external ?? null,
      paymentType: item.payment_type,
      realTransferAmount: item.real_transfer_amount ?? null,
      isCanceled: item.is_canceled,
      generalLedgerControlAccountId:
        item.general_ledger_control_account_id ?? null,
      generalLedgerControlAccountExternalId:
        item.general_ledger_control_account_external_id ?? null,
      businessPlaceId: item.business_place_id ?? null,
      businessPlaceExternalId: item.business_place_external_id ?? null,
      outgoingPaymentGroupId: item.outgoing_payment_group_id,
      branchName: item.branch_name ?? null,
      vatTaxRegistrationNumber: item.vat_tax_registration_number ?? null,
      vatTaxDate: item.vat_tax_date ?? null,
      postingDate: item.posting_date,
      dueDate: item.due_date,
      transferDate: item.transfer_date,
      taxDate: item.tax_date,
      cashFlowId: item.cash_flow_id,
      cashFlowExternalId: item.cash_flow_external_id,
      createdAt: item.created_at,
      updatedAt: item.updated_at ?? null,
      createdBy: item.created_by,
      updatedBy: item.updated_by ?? null,
      firstPullSyncAt: item.first_pull_sync_at ?? null,
      lastPullSyncAt: item.last_pull_sync_at ?? null,
      firstPushSyncAt: item.first_push_sync_at ?? null,
      lastPushSyncAt: item.last_push_sync_at ?? null
    };
  }

  private static mapStatus(item: StatusRaw): StatusDomain {
    return {
      id: item.id,
      name: item.name,
      description: item.description ?? null,
      createdAt: item.created_at,
      updatedAt: item.updated_at ?? null,
      createdBy: item.created_by,
      updatedBy: item.updated_by ?? null
    };
  }
}

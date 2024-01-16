import { VendorAddressType } from 'core.v2/domain/vendor/types/vendor-address.type';
import { VendorBankingInfoType } from 'core.v2/domain/vendor/types/vendor-banking-info.type';
import { VendorContactType } from 'core.v2/domain/vendor/types/vendor-contact.type';
import { VendorFactoryProps } from '../../../domain/vendor/factory/vendor-factory.props';
import { BusinessPartnerGroupType } from '../../../domain/vendor/types/vendor-business-partner-group.type';
import { VendorProjectType } from '../../../domain/vendor/types/vendor-project.type';
import { setNumberValue } from '../helpers/setNumber';
import type { VendorMapperInterface } from './vendor-mapper.interface';

const setObj = (dto: any) => (attr: string) => {
  if (!dto?.[attr]) return undefined;
  return dto[attr].toString();
};
export class VendorMapper implements VendorMapperInterface {
  toDomain(vendorDTO: any): VendorFactoryProps {
    const setAttr = setObj(vendorDTO);
    return {
      id: setAttr('id'),
      visualId: setAttr('visual_id'),
      externalId: setAttr('external_id'),
      globalVendorId: setAttr('global_vendor_id'),
      name: setAttr('trade_name'),
      legalName: setAttr('legal_name'),
      logoPath: setAttr('logo_path'),
      sinceAt: setAttr('created_at'),

      accountBalance: setNumberValue(vendorDTO?.account_balance),
      openInvoices: setNumberValue(vendorDTO?.open_ap_invoices),
      openBalance: vendorDTO?.open_balance_ap_invoices?.toString(),

      billToAddress: setAttr('bill_to_address'),
      billToZipCode: setAttr('bill_to_zip_code'),
      mailToAddress: setAttr('mail_to_address'),
      mailToZipCode: setAttr('mail_to_zip_code'),

      contacts: mapContacts(vendorDTO?.vendor_contacts),
      addresses: mapAddresses(vendorDTO?.vendor_addresses),
      bankingInfo: mapBankingInfo(vendorDTO?.vendor_banking_info),
      businessPartnerGroup: mapBusinessPartnerGroup(
        vendorDTO?.business_partner_group
      ),
      project: mapProject(vendorDTO?.project)
    };
  }
}

const mapProject = (project?: any): VendorProjectType | undefined => {
  if (!project) return undefined;
  return {
    externalId: project?.external_id?.toString(),
    name: project?.name?.toString(),
    generalLedgerAccountName:
      project?.general_ledger_account?.[0].account_name?.toString()
  };
};

const mapBusinessPartnerGroup = (
  businessPartnerGroup: any
): BusinessPartnerGroupType | undefined => {
  if (!businessPartnerGroup) return undefined;
  return {
    id: businessPartnerGroup?.id?.toString(),
    externalId: businessPartnerGroup?.external_id?.toString(),
    name: businessPartnerGroup?.name?.toString(),
    description: businessPartnerGroup?.description?.toString()
  };
};

const mapBankingInfo = (
  bankingInfos?: any[]
): VendorBankingInfoType[] | undefined => {
  if (!bankingInfos) return undefined;
  return bankingInfos?.map((bankingInfo): VendorBankingInfoType => {
    return {
      id: bankingInfo.id?.toString(),
      externalId: bankingInfo.external_id?.toString(),
      vendorId: bankingInfo.vendor_id?.toString(),
      vendorExternalId: bankingInfo.vendor_external_id?.toString(),
      bankCode: bankingInfo.bank_code?.toString(),
      accountName: bankingInfo.account_name?.toString(),
      bankIdentifierCode: bankingInfo.bank_identifier_code?.toString(),
      abaRoutingNumber: bankingInfo.aba_routing_number?.toString(),
      customerIdNumber: bankingInfo.customer_id_number?.toString(),
      correspondentAccount: bankingInfo.correspondent_account?.toString(),
      countryId: bankingInfo.country_id?.toString(),
      countryExternalId: bankingInfo.country_external_id?.toString(),
      country: bankingInfo.county?.toString(),
      state: bankingInfo.state?.toString(),
      iban: bankingInfo.iban?.toString(),
      zipCode: bankingInfo.zip_code?.toString(),
      city: bankingInfo.city?.toString(),
      block: bankingInfo.block?.toString(),
      branch: bankingInfo.branch?.toString(),
      street: bankingInfo.street?.toString(),
      controlKey: bankingInfo.control_key?.toString(),
      buildingFloorRoom: bankingInfo.building_floor_room?.toString(),
      logInstance: bankingInfo.log_instance?.toString(),
      bik: bankingInfo.bik?.toString(),
      phone: bankingInfo.phone?.toString(),
      fax: bankingInfo.fax?.toString(),
      isrBillerId: bankingInfo.isr_biller_id?.toString(),
      isrType: bankingInfo.isr_type?.toString(),
      mandateId: bankingInfo.mandate_id?.toString(),
      signatureDate: bankingInfo.signature_date?.toString(),
      mandateExpirationDate: bankingInfo.mandate_expiration_date?.toString(),
      sepaSeqType: bankingInfo.sepa_seq_type?.toString(),
      paymentGatewayId: bankingInfo.payment_gateway_id?.toString(),
      firstPullSyncAt: bankingInfo.first_pull_sync_at?.toString(),
      lastPullSyncAt: bankingInfo.last_pull_sync_at?.toString(),
      firstPushSyncAt: bankingInfo.first_push_sync_at?.toString(),
      lastPushSyncAt: bankingInfo.last_push_sync_at?.toString(),
      currencyId: bankingInfo.currency_id?.toString(),
      vaultPaymentMethodId: bankingInfo.vault_payment_method_id?.toString(),
      redactedAccountNumber: bankingInfo.redacted_account_number?.toString(),
      bankId: bankingInfo.bank_id?.toString()
    };
  });
};

const mapAddresses = (addresses: any[]): VendorAddressType[] | undefined => {
  if (!addresses) return undefined;
  return addresses.map((contact: any): VendorAddressType => {
    const setAttr = setObj(contact);
    return {
      id: setAttr('id'),
      externalId: setAttr('external_id'),
      vendorId: setAttr('vendor_id'),
      vendorExternalId: setAttr('vendor_external_id'),
      street: setAttr('street'),
      block: setAttr('block'),
      zipCode: setAttr('zip_code'),
      city: setAttr('city'),
      state: setAttr('state'),
      country: setAttr('country'),
      countryCode: setAttr('country_code'),
      countryExternalCode: setAttr('country_external_code'),
      addressType: setAttr('address_type'),
      lineNumber: setAttr('line_number'),
      isTaasEnabled: Boolean(contact.is_taas_enabled),
      firstPullSyncAt: setAttr('first_pull_sync_at'),
      lastPullSyncAt: setAttr('last_pull_sync_at'),
      firstPushSyncAt: setAttr('first_push_sync_at'),
      lastPushSyncAt: setAttr('last_push_sync_at')
    };
  });
};

const mapContacts = (contacts?: any[]): VendorContactType[] | undefined => {
  if (!contacts) return undefined;
  return contacts.map(
    (contact: any): VendorContactType => ({
      id: contact.id?.toString(),
      name: contact.name?.toString(),
      firstName: contact.first_name?.toString(),
      lastName: contact.last_name?.toString(),
      middleName: contact.middle_name?.toString(),
      email: contact.email?.toString(),
      phone1: contact.phone1?.toString(),
      phone2: contact.phone2?.toString(),
      mobilePhone1: contact.mobile_phone1?.toString(),
      mobilePhone2: contact.mobile_phone2?.toString(),
      fax: contact.fax?.toString(),
      position: contact.position?.toString(),
      profession: contact.profession?.toString(),
      gender: contact.gender.description?.toString(),
      isPrimaryContact: Boolean(contact.is_primary_contact),
      isBlockedFromBankingForm: Boolean(contact.is_blocked_from_banking_form)
    })
  );
};

type InputVendorMapperDTO = {
  id: string;
  visual_id: string;
  global_vendor_id: string;
  trade_name: string;
  legal_name: string;
  identification_type: string;

  logo_path: string;
  email: string;

  bill_to_address: string;
  bill_to_zip_code: string;
  mail_to_address: string;
  mail_to_zip_code: string;

  phone1: string;
  phone2: string;
  fax: string;

  notes: string;
  payment_term_id: string;
  payment_term_external_id: string;

  credit_limit: string;
  debt_limit: string;

  discount_percent: string;
  vat_status: string;
  federal_tax_id: string;
  is_liable_for_deductible_at_source: string;
  withholding_tax_deduction_percent: string;
  withholding_tax_deduction_valid_until: string;
  price_list_id: string;
  price_list_external_id: string;
  interest_rate: string;
  free_text: string;
  currency_id: string;
  mobile_phone1: string;
  mobile_phone2: string;
  average_payment_delay_in_days: string;

  bill_to_city: string;
  bill_to_county: string;
  bill_to_country_code: string;
  bill_to_country_external_code: string;

  ship_to_city: string;
  ship_to_county: string;
  ship_to_country_code: string;
  ship_to_country_external_code: string;

  default_general_ledger_account_id: string;
  default_general_ledger_account_external_id: string;
  default_branch_id: string;
  default_branch_external_id: string;
  default_bank_code: string;
  external_id2: string;
  parent_company_id: string;
  parent_company_external_id: string;
  foreign_name: string;
  parent_company_type: string;
  minimum_interest: string;
  account_balance: string;
  open_delivery_notes_balance: string;
  open_orders_balance: string;
  open_checks_balance: string;
  sales_tax_code_id: string;
  sales_tax_code_external_id: string;
  iban: string;
  is_active: string;
  valid_since: string;
  valid_until: string;
  active_status_notes: string;
  is_frozen: string;
  frozen_since: string;
  frozen_until: string;
  frozen_status_notes: string;
  form_1099_external_id: string;
  box_1099_external: string;
  bank_country_code: string;
  bank_country_external_code: string;
  house_bank: string;
  house_bank_country_code: string;
  house_bank_country_external_code: string;
  house_bank_account: string;
  requires_single_payment: string;
  is_payment_block: string;
  house_bank_branch: string;
  created_by_external_id: string;
  payment_block_description: string;
  payment_block_external_id: string;
  expiration_date: string;
  is_accrual: string;
  project_id: string;
  project_external_id: string;
  website: string;
  other_general_ledger_account_id: string;
  other_general_ledger_account_external_id: string;
  business_type: string;
  language_id: string;
  language_external_id: string;
  profession: string;
  object_to_apply_discounts: string;
  discount_relation: string;
  industry_external_id: string;
  industry_description: string;
  house_bank_iban: string;
  representative_name: string;
  document_numbering_series_id: string;
  document_numbering_series_external_id: string;
  blanket_agreement_external_id: string;
  has_no_discounts: string;
  effective_price: string;
  effective_price_considers_price_before_discount: string;
  edi_sender_id: string;
  edi_recipient_id: string;
  accepts_endorsed_checks: string;
  created_by_external: string;
  exclude_from_marketing_communication: string;
  price_mode: string;
  merchant_id: string;
  legal_text: string;
  is_exchange_rate_for_outgoing_payment: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  first_pull_sync_at: string;
  last_pull_sync_at: string;
  first_push_sync_at: string;
  last_push_sync_at: string;
  business_partner_group_external_id: string;
  business_partner_group_id: string;
  external_id: string;
  currency_external_id: string;
  industry_id: string;
  vault_id: string;
  default_processor_id: string;
  default_bank_account_number: string;
  default_vault_payment_method_id: string;
  vendor_contacts: InputVendorContactDTO[];
  vendor_addresses: InputVendorAddressDTO[];
  vendor_banking_info?: InputVendorBankingInfoDTO[];
  vendor_notes: [];
};

type InputVendorContactDTO = {
  id: string;
  external_id: string;
  global_vendor_id: string;
  vendor_id: string;
  vendor_external_id: string;
  name: string;
  position: string;
  address: string;
  phone1: string;
  phone2: string;
  mobile_phone1: string;
  mobile_phone2: string;
  fax: string;
  email: string;
  notes: string;
  birth_place: string;
  birth_date: string;
  gender_id: string;
  profession: string;
  title: string;
  city_of_birth: string;
  is_active: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  email_group_id: string;
  email_group_external_id: string;
  exclude_from_marketing_communication: string;
  preferred_contact_method: string;
  contact_person_type: string;
  is_primary_contact: string;
  banking_form_pin: string;
  banking_form_access_attempts: string;
  is_blocked_from_banking_form: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  first_pull_sync_at: string;
  last_pull_sync_at: string;
  first_push_sync_at: string;
  last_push_sync_at: string;
  description: string;
  gender: {
    description: string;
  };
};

type InputVendorAddressDTO = {
  id: string;
  external_id: string;
  vendor_id: string;
  vendor_external_id: string;
  address_1: string;
  street: string;
  block: string;
  zip_code: string;
  city: string;
  county: string;
  country_code: string;
  country_external_code: string;
  state: string;
  federal_tax_id: string;
  sales_tax_code_id: string;
  sales_tax_code_external_id: string;
  address_details: string;
  address_type: string;
  address_2: string;
  address_3: string;
  line_number: string;
  global_location_number: string;
  nationality: string;
  tax_office: string;
  goods_and_services_tax_identification_number: string;
  goods_and_services_tax_type_external_id: string;
  myf_type: string;
  is_taas_enabled: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  first_pull_sync_at: string;
  last_pull_sync_at: string;
  first_push_sync_at: string;
  last_push_sync_at: string;
};

type InputVendorBankingInfoDTO = {
  id: string;
  external_id: string;
  vendor_id: string;
  vendor_external_id: string;
  bank_code: string;
  account_name: string;
  bank_identifier_code: string;
  aba_routing_number: string;
  customer_id_number: string;
  correspondent_account: string;
  country_id: string;
  country_external_id: string;
  county: string;
  state: string;
  iban: string;
  zip_code: string;
  city: string;
  block: string;
  branch: string;
  street: string;
  control_key: string;
  building_floor_room: string;
  user1: string;
  user2: string;
  user3: string;
  user4: string;
  log_instance: string;
  bik: string;
  phone: string;
  fax: string;
  isr_biller_id: string;
  isr_type: string;
  mandate_id: string;
  signature_date: string;
  mandate_expiration_date: string;
  sepa_seq_type: string;
  payment_gateway_id: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  first_pull_sync_at: string;
  last_pull_sync_at: string;
  first_push_sync_at: string;
  last_push_sync_at: string;
  currency_id: string;
  vault_payment_method_id: string;
  redacted_account_number: string;
  bank_id: string;
};

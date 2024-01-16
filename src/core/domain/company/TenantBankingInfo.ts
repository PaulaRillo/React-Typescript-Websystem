import { tenant_banking_info } from './tenant_banking_info';

export class TenantBankingInfo {
  id?: string;
  external_id?: string;
  bank_id?: string;
  bank_code?: string;
  redacted_account_number?: string;
  account_name?: string;
  country_id?: string;
  country_external_id?: string;
  county?: string;
  state?: string;
  iban?: string;
  zip_code?: string;
  city?: string;
  block?: string;
  branch?: string;
  street?: string;
  currency_id?: string;
  general_ledger_account_id?: string;
  general_ledger_account_external_id?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: string;
  updated_by?: string;
  first_pull_sync_at?: Date;
  last_pull_sync_at?: Date;
  first_push_sync_at?: Date;
  last_push_sync_at?: Date;

  constructor(input?: tenant_banking_info) {
    this.id = input?.id;
    this.external_id = input?.external_id;
    this.bank_id = input?.bank_id;
    this.bank_code = input?.bank_code;
    this.redacted_account_number = input?.redacted_account_number;
    this.account_name = input?.account_name;
    this.country_id = input?.country_id;
    this.country_external_id = input?.country_external_id;
    this.county = input?.county;
    this.state = input?.state;
    this.iban = input?.iban;
    this.zip_code = input?.zip_code;
    this.city = input?.city;
    this.block = input?.block;
    this.branch = input?.branch;
    this.street = input?.street;
    this.currency_id = input?.currency_id;
    this.general_ledger_account_id = input?.general_ledger_account_id;
    this.general_ledger_account_external_id = input?.general_ledger_account_external_id;
    this.created_at = input?.created_at;
    this.updated_at = input?.updated_at;
    this.created_by = input?.created_by;
    this.updated_by = input?.updated_by;
    this.first_pull_sync_at = input?.first_pull_sync_at;
    this.last_pull_sync_at = input?.last_pull_sync_at;
    this.first_push_sync_at = input?.first_push_sync_at;
    this.last_push_sync_at = input?.last_push_sync_at;
    Object.freeze(this);
  }
}

import { VendorContactInput } from './VendorContactInput';
import { VendorBankingInfoInput } from './VendorBankingInfoInput';
import { VendorAddressInput } from './VendorAddressInput';

export type VendorInput = {
  id: string;
  external_id: string | null;
  visual_id: string;
  trade_name: string;
  vendor_contacts: VendorContactInput[] | null;
  vendor_banking_info: VendorBankingInfoInput[] | null;
  mail_to_address: string | null;
  bill_to_address: string | null;
  phone1: string | null;
  phone2: string | null;
  vendor_addresses: VendorAddressInput[] | null;
  valid_since: string | null;
  valid_until: string | null;
  is_frozen: boolean;
  frozen_since: string | null;
  frozen_until: string | null;
  frozen_status_notes: string | null;
  industry_id: string | null;
  industry_external_id: string | null;
  industry_description: string | null;
};

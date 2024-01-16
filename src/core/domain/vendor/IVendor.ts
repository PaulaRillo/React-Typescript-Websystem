import { IVendorContact } from './IVendorContact';
import { IVendorBankingInfo } from './IVendorBankingInfo';
import { VendorAddress } from './VendorAddress';

export type IVendor = {
  id: string;
  externalId: string | null;
  visualId: string;
  name: string;
  vendorContacts: IVendorContact[] | null;
  vendorBankingInfo: IVendorBankingInfo[] | null;
  vendorAddresses: VendorAddress[] | null;
  mailToAddress: string | null;
  billToAddress: string | null;
  phone1: string | null;
  phone2: string | null;
  validSince: string | null;
  validUntil: string | null;
  isFrozen: boolean;
  frozenSince: string | null;
  frozenUntil: string | null;
  frozenStatusNotes: string | null;
  industryId: string | null;
  industryExternalId: string | null;
  industryDescription: string | null;
};

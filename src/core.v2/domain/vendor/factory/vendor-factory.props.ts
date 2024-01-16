import { VendorAddressType } from '../types/vendor-address.type';
import { VendorBankingInfoType } from '../types/vendor-banking-info.type';
import { BusinessPartnerGroupType } from '../types/vendor-business-partner-group.type';
import { VendorContactType } from '../types/vendor-contact.type';
import { VendorProjectType } from '../types/vendor-project.type';

export type VendorFactoryProps = {
  id: string;
  visualId: string;
  externalId: string;
  globalVendorId: string;
  name: string;
  legalName: string;
  logoPath: string;
  sinceAt: string;

  accountBalance: number;
  openInvoices: number;
  openBalance: string;

  billToAddress: string;
  billToZipCode: string;
  mailToAddress: string;
  mailToZipCode: string;

  contacts?: VendorContactType[];
  addresses?: VendorAddressType[];
  bankingInfo?: VendorBankingInfoType[];
  businessPartnerGroup?: BusinessPartnerGroupType;
  project?: VendorProjectType;
};

import { VendorAddressType } from '../types/vendor-address.type';
import { VendorBankingInfoType } from '../types/vendor-banking-info.type';
import { BusinessPartnerGroupType } from '../types/vendor-business-partner-group.type';
import { VendorContactType } from '../types/vendor-contact.type';
import { VendorProjectType } from '../types/vendor-project.type';

export class Vendor {
  constructor(
    public readonly id: string,
    public readonly visualId: string,
    public readonly externalId: string,
    public readonly globalVendorId: string,
    public readonly name: string,
    public readonly legalName: string,
    public readonly logoPath: string,
    public readonly sinceAt: string,

    public readonly accountBalance: number,
    public readonly openInvoices: number,
    public readonly openBalance: string,

    public readonly billToAddress: string,
    public readonly billToZipCode: string,
    public readonly mailToAddress: string,
    public readonly mailToZipCode: string,

    public readonly contacts: VendorContactType[] | undefined,
    public readonly primaryContact: VendorContactType | undefined,
    public readonly addresses: VendorAddressType[] | undefined,
    public readonly bankingInfo: VendorBankingInfoType[] | undefined,
    public readonly businessPartnerGroup: BusinessPartnerGroupType | undefined,
    public readonly project: VendorProjectType | undefined
  ) {}
}

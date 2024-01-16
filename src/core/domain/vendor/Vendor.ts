import { VendorContact } from './VendorContact';
import { VendorInput } from './VendorInput';
import { IVendor } from './IVendor';
import { VendorBankingInfo } from './VendorBankingInfo';
import { VendorAddress } from './VendorAddress';

export class Vendor {
  public id: string;
  public externalId: string | null;
  public visualId: string;
  public name: string;
  public contacts: VendorContact[] | null;
  public vendorBankingInfo: VendorBankingInfo[] | null;
  public mailToAddress: string | null;
  public billToAddress: string | null;
  public phone1: string | null;
  public phone2: string | null;
  public vendorAddresses: VendorAddress[] | null;
  public validSince: string | null;
  public validUntil: string | null;
  public isFrozen: boolean;
  public frozenSince: string | null;
  public frozenUntil: string | null;
  public frozenStatusNotes: string | null;
  public industryId: string | null;
  public industryExternalId: string | null;
  public industryDescription: string | null;

  constructor(input: VendorInput) {
    this.id = input.id;
    this.externalId = input.external_id;
    this.visualId = input.visual_id;
    this.name = input.trade_name;
    this.contacts =
      input?.vendor_contacts?.map((vc) => new VendorContact(vc)) ?? null;
    this.vendorBankingInfo = input?.vendor_banking_info
      ? input.vendor_banking_info?.map((i) => new VendorBankingInfo(i))
      : null;
    this.mailToAddress = input.mail_to_address;
    this.billToAddress = input.bill_to_address;
    this.phone1 = input.phone1;
    this.phone2 = input.phone2;
    this.vendorAddresses = input?.vendor_addresses
      ? input.vendor_addresses?.map((address) => new VendorAddress(address))
      : null;
    this.validSince = input.valid_since;
    this.validUntil = input.valid_until;
    this.isFrozen = input.is_frozen;
    this.frozenSince = input.frozen_since;
    this.frozenUntil = input.frozen_until;
    this.frozenStatusNotes = input.frozen_status_notes;
    this.industryId = input.industry_id;
    this.industryExternalId = input.industry_external_id;
    this.industryDescription = input.industry_description;
  }

  getVendor(): IVendor {
    let contacts = null;
    if (this.contacts && this.contacts.length > 0) {
      contacts = this.contacts.map((contact) => {
        return contact.getVendorContact();
      });
    }
    let bankingInfo = null;
    if (this.vendorBankingInfo && this.vendorBankingInfo.length > 0) {
      bankingInfo = this.vendorBankingInfo.map((bank) => {
        return bank.getVendorBankingInfo();
      });
    }

    return {
      id: this.id,
      externalId: this.externalId,
      visualId: this.visualId,
      name: this.name,
      vendorContacts: contacts,
      vendorBankingInfo: bankingInfo,
      mailToAddress: this.mailToAddress,
      billToAddress: this.billToAddress,
      phone1: this.phone1,
      phone2: this.phone2,
      vendorAddresses: this.vendorAddresses,
      validSince: this.validSince,
      validUntil: this.validUntil,
      isFrozen: this.isFrozen,
      frozenSince: this.frozenSince,
      frozenUntil: this.frozenUntil,
      frozenStatusNotes: this.frozenStatusNotes,
      industryId: this.industryId,
      industryExternalId: this.industryExternalId,
      industryDescription: this.industryDescription
    };
  }
}

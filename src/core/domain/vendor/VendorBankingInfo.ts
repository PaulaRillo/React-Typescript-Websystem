import { VendorBankingInfoInput } from './VendorBankingInfoInput';
import { IVendorBankingInfo } from './IVendorBankingInfo';

export class VendorBankingInfo {
  public id: string;
  public externalId: string | null;
  public vendorId: string;
  public vendorExternalId: string | null;
  public bankCode: string | null;
  public accountNumber: string | null;
  public accountName: string | null;
  public bankIdentifierCode: string | null;
  public abaRoutingNumber: string | null;
  public customerIdNumber: string | null;
  public correspondentAccount: string | null;
  public currencyId: string | null;
  public countryId: string | null;
  public countryExternalId: string | null;
  public county: string | null;
  public state: string | null;
  public iban: string | null;
  public zipCode: string | null;
  public city: string | null;
  public block: string | null;
  public branch: string | null;
  public street: string | null;
  public controlKey: string | null;
  public buildingFloorRoom: string | null;
  public user1: string | null;
  public user2: string | null;
  public user3: string | null;
  public user4: string | null;
  public logInstance: string | null;
  public bik: string | null;
  public phone: string | null;
  public fax: string | null;
  public isrBillerId: string | null;
  public isrType: number | null;
  public mandateId: string | null;
  public signatureDate: string | null;
  public mandateExpirationDate: string | null;
  public sepaSeqType: number | null;
  public paymentGatewayId: string | null;
  public createdAt: string;
  public updatedAt: string | null;
  public createdBy: string;
  public updatedBy: string | null;

  constructor(input: VendorBankingInfoInput) {
    this.id = input.id;
    this.externalId = input.external_id;
    this.vendorId = input.vendor_id;
    this.vendorExternalId = input.vendor_external_id;
    this.bankCode = input.bank_code;
    this.accountNumber = input.account_number;
    this.accountName = input.account_name;
    this.bankIdentifierCode = input.bank_identifier_code;
    this.abaRoutingNumber = input.aba_routing_number;
    this.customerIdNumber = input.customer_id_number;
    this.correspondentAccount = input.correspondent_account;
    this.currencyId = input.currency_id;
    this.countryId = input.country_id;
    this.countryExternalId = input.country_external_id;
    this.county = input.county;
    this.state = input.state;
    this.iban = input.iban;
    this.zipCode = input.zip_code;
    this.city = input.city;
    this.block = input.block;
    this.branch = input.branch;
    this.street = input.street;
    this.controlKey = input.control_key;
    this.buildingFloorRoom = input.building_floor_room;
    this.user1 = input.user1;
    this.user2 = input.user2;
    this.user3 = input.user3;
    this.user4 = input.user4;
    this.logInstance = input.log_instance;
    this.bik = input.bik;
    this.phone = input.phone;
    this.fax = input.fax;
    this.isrBillerId = input.isr_biller_id;
    this.isrType = input.isr_type;
    this.mandateId = input.mandate_id;
    this.signatureDate = input.signature_date;
    this.mandateExpirationDate = input.mandate_expiration_date;
    this.sepaSeqType = input.sepa_seq_type;
    this.paymentGatewayId = input.payment_gateway_id;
    this.createdAt = input.created_at;
    this.updatedAt = input.updated_at;
    this.createdBy = input.created_by;
    this.updatedBy = input.updated_by;
  }

  getVendorBankingInfo(): IVendorBankingInfo {
    return {
      id: this.id,
      externalId: this.externalId,
      vendorId: this.vendorId,
      vendorExternalId: this.vendorExternalId,
      bankCode: this.bankCode,
      accountNumber: this.accountNumber,
      accountName: this.accountName,
      bankIdentifierCode: this.bankIdentifierCode,
      abaRoutingNumber: this.abaRoutingNumber,
      customerIdNumber: this.customerIdNumber,
      correspondentAccount: this.correspondentAccount,
      currencyId: this.currencyId,
      countryId: this.countryId,
      countryExternalId: this.countryExternalId,
      county: this.county,
      state: this.state,
      iban: this.iban,
      zipCode: this.zipCode,
      city: this.city,
      block: this.block,
      branch: this.branch,
      street: this.street,
      controlKey: this.controlKey,
      buildingFloorRoom: this.buildingFloorRoom,
      user1: this.user1,
      user2: this.user2,
      user3: this.user3,
      user4: this.user4,
      logInstance: this.logInstance,
      bik: this.bik,
      phone: this.phone,
      fax: this.fax,
      isrBillerId: this.isrBillerId,
      isrType: this.isrType,
      mandateId: this.mandateId,
      signatureDate: this.signatureDate,
      mandateExpirationDate: this.mandateExpirationDate,
      sepaSeqType: this.sepaSeqType,
      paymentGatewayId: this.paymentGatewayId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      createdBy: this.createdBy,
      updatedBy: this.updatedBy
    };
  }
}

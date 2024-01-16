import { VendorAddressInput } from './VendorAddressInput';
import { IVendorAddress } from './IVendorAddress';

export class VendorAddress {
  public id: string;
  public externalId: string | null;
  public vendorId: string;
  public vendorExternalId: string | null;
  public street: string | null;
  public block: string | null;
  public zipCode: string | null;
  public city: string | null;
  public county: string | null;
  public countryCode: string | null;
  public countryExternalCode: string | null;
  public state: string | null;
  public federalTaxId: string | null;
  public salesTaxCodeId: string | null;
  public salesTaxCodeExternalId: string | null;
  public addressDetails: string | null;
  public addressType: number | null;
  public address1: string | null;
  public address2: string | null;
  public address3: string | null;
  public lineNumber: number | null;
  public globalLocationNumber: string | null;
  public nationality: string | null;
  public taxOffice: string | null;
  public goodsAndServicesTaxIdentificationNumber: string | null;
  public goodsAndServicesTaxTypeExternalId: string | null;
  public myfType: number | null;
  public isTaasEnabled: boolean | null;

  constructor(input: VendorAddressInput) {
    this.id = input.id;
    this.externalId = input.external_id;
    this.vendorId = input.vendor_id;
    this.vendorExternalId = input.vendor_external_id;
    this.street = input.street;
    this.block = input.block;
    this.zipCode = input.zip_code;
    this.city = input.city;
    this.county = input.county;
    this.countryCode = input.country_code;
    this.countryExternalCode = input.country_external_code;
    this.state = input.state;
    this.federalTaxId = input.federal_tax_id;
    this.salesTaxCodeId = input.sales_tax_code_id;
    this.salesTaxCodeExternalId = input.sales_tax_code_external_id;
    this.addressDetails = input.address_details;
    this.addressType = input.address_type;
    this.address1 = input.address_1;
    this.address2 = input.address_2;
    this.address3 = input.address_3;
    this.lineNumber = input.line_number;
    this.globalLocationNumber = input.global_location_number;
    this.nationality = input.nationality;
    this.taxOffice = input.tax_office;
    this.goodsAndServicesTaxIdentificationNumber =
      input.goods_and_services_tax_identification_number;
    this.goodsAndServicesTaxTypeExternalId =
      input.goods_and_services_tax_type_external_id;
    this.myfType = input.myf_type;
    this.isTaasEnabled = input.is_taas_enabled;
  }

  getVendor(): IVendorAddress {
    return {
      id: this.id,
      externalId: this.externalId,
      vendorId: this.vendorId,
      vendorExternalId: this.vendorExternalId,
      street: this.street,
      block: this.block,
      zipCode: this.zipCode,
      city: this.city,
      county: this.county,
      countryCode: this.countryCode,
      countryExternalCode: this.countryExternalCode,
      state: this.state,
      federalTaxId: this.federalTaxId,
      salesTaxCodeId: this.salesTaxCodeId,
      salesTaxCodeExternalId: this.salesTaxCodeExternalId,
      addressDetails: this.addressDetails,
      addressType: this.addressType,
      address1: this.address1,
      address2: this.address2,
      address3: this.address3,
      lineNumber: this.lineNumber,
      globalLocationNumber: this.globalLocationNumber,
      nationality: this.nationality,
      taxOffice: this.taxOffice,
      goodsAndServicesTaxIdentificationNumber:
        this.goodsAndServicesTaxIdentificationNumber,
      goodsAndServicesTaxTypeExternalId: this.goodsAndServicesTaxTypeExternalId,
      myfType: this.myfType,
      isTaasEnabled: this.isTaasEnabled
    };
  }
}

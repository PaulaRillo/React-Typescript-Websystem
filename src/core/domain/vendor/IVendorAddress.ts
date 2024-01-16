export type IVendorAddress = {
  id: string;
  externalId: string | null;
  vendorId: string;
  vendorExternalId: string | null;
  street: string | null;
  block: string | null;
  zipCode: string | null;
  city: string | null;
  county: string | null;
  countryCode: string | null;
  countryExternalCode: string | null;
  state: string | null;
  federalTaxId: string | null;
  salesTaxCodeId: string | null;
  salesTaxCodeExternalId: string | null;
  addressDetails: string | null;
  addressType: number | null;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  lineNumber: number | null;
  globalLocationNumber: string | null;
  nationality: string | null;
  taxOffice: string | null;
  goodsAndServicesTaxIdentificationNumber: string | null;
  goodsAndServicesTaxTypeExternalId: string | null;
  myfType: number | null;
  isTaasEnabled: boolean | null;
};
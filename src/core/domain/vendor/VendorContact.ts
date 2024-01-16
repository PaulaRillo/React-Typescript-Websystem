import { VendorContactInput } from './VendorContactInput';
import { IVendorContact } from './IVendorContact';

export class VendorContact {
  public id: string;
  public name: string;
  public firstName: string | null;
  public lastName: string | null;
  public email: string | null;
  public phone1: string | null;
  public isPrimary: boolean;
  public isActive: boolean;
  public phone2: string | null;
  public position: string | null;
  public gender: string;
  public notes: string | null;

  constructor(input: VendorContactInput) {
    this.id = input?.id;
    this.name = input?.name;
    this.firstName = input?.first_name;
    this.lastName = input?.last_name;
    this.email = input?.email;
    this.phone1 = input?.phone1;
    this.phone2 = input?.phone2;
    this.position = input?.position;
    this.gender = input?.gender?.description;
    this.notes = input?.notes;
    this.isPrimary = input?.is_primary_contact;
    this.isActive = input?.is_active;
  }

  getVendorContact(): IVendorContact {
    return {
      id: this.id,
      name: this.name,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone1: this.phone1,
      phone2: this.phone2,
      position: this.position,
      gender: this.gender,
      notes: this.notes,
      isPrimaryContact: this.isPrimary,
      isActive: this.isActive
    };
  }
}

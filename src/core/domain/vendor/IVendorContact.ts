export type IVendorContact = {
  id: string;
  name: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phone1: string | null;
  phone2: string | null;
  position: string | null;
  gender: string | null;
  notes: string | null;
  isPrimaryContact: boolean;
  isActive: boolean;
};

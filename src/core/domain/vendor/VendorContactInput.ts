export type VendorContactInput = {
  id: string;
  name: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone1: string | null;
  phone2: string | null;
  position: string | null;
  gender: {
    description: string;
  };
  notes: string | null;
  is_primary_contact: boolean;
  is_active: boolean;
};

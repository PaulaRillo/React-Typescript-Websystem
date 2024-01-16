type Contact = {
  name: string;
  email: string;
};

export type Vendor = {
  id: string;
  name: string;
  openBills: number;
  contact: Contact;
};

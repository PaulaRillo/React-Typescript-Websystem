export type Currency = {
  external_id: string;
  id: string;
  iso4217_alpha3: string;
  name: string;
  symbol: string;
};

export type Vendor = {
  id: string;
  external_id: string;
  legal_name: string;
  trade_name: string;
  visual_id: string;
};

export type Bill = {
  id: string;
  invoice_total: string;
  invoice_total_in_foreign_currency: string;
  invoice_total_in_system_currency: string;
  invoice_type: number;
  vendor: Vendor;
  status: string;
  currency?: Currency;
  balance: number;
  open: string;
};

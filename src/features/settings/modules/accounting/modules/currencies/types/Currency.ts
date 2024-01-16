import { CurrencyRoundingOption } from './CurrencyRoundingOption';
import { CurrencyDecimalOption } from './CurrencyDecimalOption';

export type Currency = {
  id: string;
  external_id: string;
  iso4217_alpha3?: string;
  iso4217_numeric3?: string;
  name: string;
  symbol: string;
  rounding: number;
  decimals: number;
  rounding_system?: CurrencyRoundingOption;
  currency_decimal_option?: CurrencyDecimalOption;
  is_payment_rounded: boolean;
  is_active: boolean;
  is_configured: boolean;
  created_by?: string;
  created_at?: string;
  updated_by: string;
  updated_at: string;
};

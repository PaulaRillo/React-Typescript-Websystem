import { CurrencyRoundingOption } from './CurrencyRoundingOption';
import { CurrencyDecimalOption } from './CurrencyDecimalOption';

export type CurrencyOptions = {
  currency_decimal_options: CurrencyDecimalOption[];
  currency_rounding_options: CurrencyRoundingOption[];
};

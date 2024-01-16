import { RoundingSystemType } from './rounding-system.type';
import { CurrencyDecimalOptionType } from './currency-decimal-option.type';

export type CurrencyType = {
  id: string;
  externalId: string;
  iso4217Alpha3: string;
  iso4217Numeric3: string;
  name: string;
  symbol: string;
  isActive: boolean;
  isConfigured: boolean;
  isPaymentRounded: boolean;
  rounding: RoundingSystemType | null;
  decimals: CurrencyDecimalOptionType | null;
};

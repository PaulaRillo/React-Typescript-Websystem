import { CurrencyMapperInterface } from './currency-mapper.interface';
import { CurrencyType } from '../../../domain/@shared/types/currency.type';
import { RoundingSystemType } from '../../../domain/@shared/types/rounding-system.type';
import { CurrencyDecimalOptionType } from '../../../domain/@shared/types/currency-decimal-option.type';

export class CurrencyMapper implements CurrencyMapperInterface {
  public toDomain(raw: any): CurrencyType {
    return {
      id: raw?.id,
      externalId: raw?.external_id,
      iso4217Alpha3: raw?.iso4217_alpha3,
      iso4217Numeric3: raw?.iso4217_numeric3,
      name: raw?.name,
      symbol: raw?.symbol,
      isActive: raw?.is_active,
      isConfigured: raw?.is_configured,
      isPaymentRounded: raw?.is_payment_rounded,
      rounding: setRounding(raw?.rounding_system) ?? null,
      decimals: setDecimals(raw?.currency_decimal_option) ?? null
    };
  }
}

const setRounding = (rounding: any): RoundingSystemType => {
  return {
    id: rounding?.id?.toString(),
    name: rounding?.name?.toString(),
    description: rounding?.description.toString()
  };
};

const setDecimals = (decimals: any): CurrencyDecimalOptionType => {
  return {
    id: decimals?.id?.toString(),
    name: decimals?.name?.toString(),
    description: decimals?.description.toString()
  };
};

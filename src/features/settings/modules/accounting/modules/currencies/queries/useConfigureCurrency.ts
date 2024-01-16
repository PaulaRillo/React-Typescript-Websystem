import core from 'core.v2';
import { CurrencyType } from '../../../../../../../core.v2/domain/@shared/types/currency.type';

export const useConfigureCurrency = async (
  currency: CurrencyType
): Promise<any> => {
  return await core.setup.configureCurrency(currency);
};

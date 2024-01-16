import { CurrencyType } from '../../../domain/@shared/types/currency.type';

export interface SetupControllerInterface {
  getCurrencies(): Promise<CurrencyType[]>;
  getConfiguredCurrencies(): Promise<CurrencyType[]>;
  getTenantConfigurations(): Promise<any>;
  configureCurrency(currency: CurrencyType): Promise<any>;
  getSystemManagedCurrencies(): Promise<CurrencyType[]>;
}

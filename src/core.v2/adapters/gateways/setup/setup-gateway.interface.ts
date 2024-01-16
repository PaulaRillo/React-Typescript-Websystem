import { CurrencyType } from '../../../domain/@shared/types/currency.type';
export interface SetupGatewayInterface {
  getCurrencies(): Promise<CurrencyType[]>;
  configureCurrency(currency: CurrencyType): Promise<CurrencyType>;
  getSystemManagedCurrencies(): Promise<CurrencyType[]>;
  getTenantConfigurations(): Promise<any>;
  getConfiguredCurrencies(): Promise<CurrencyType[]>;
}

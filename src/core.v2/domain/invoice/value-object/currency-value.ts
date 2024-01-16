import { Currency } from '../../@shared/value-objects/currency';

export class CurrencyValue {
  public value!: number;

  constructor(
    public readonly localCurrency: number,
    public readonly systemCurrency: number,
    public readonly foreignCurrency: number,
    public readonly invoiceCurrency: Currency,
    public readonly tenantLocalCurrencyId: string,
    public readonly tenantSystemCurrencyId: string
  ) {
    this.setValueBasedOnCurrency();
  }

  private matchLocalCurrency(): boolean {
    return this.tenantLocalCurrencyId === this.invoiceCurrency.id;
  }

  private matchSystemCurrency(): boolean {
    return this.tenantSystemCurrencyId === this.invoiceCurrency.id;
  }

  private setValueBasedOnCurrency(): void {
    this.value = this.matchLocalCurrency()
      ? this.localCurrency
      : this.matchSystemCurrency()
      ? this.systemCurrency
      : this.foreignCurrency;
  }
}

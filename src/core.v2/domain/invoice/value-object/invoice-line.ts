import { Currency } from '../../@shared/value-objects/currency';
import { CurrencyValue } from './currency-value';

export class InvoiceLine {
  constructor(
    public readonly id?: string,
    public readonly externalId?: string,
    public readonly lineNumber?: number,
    public readonly itemId?: string,
    public readonly itemExternalId?: string,
    public readonly itemDescription?: string,
    public readonly quantity?: number,
    public readonly unitPrice?: number,
    public readonly lineTotal?: CurrencyValue,
    public readonly currency?: Currency
  ) {}
}

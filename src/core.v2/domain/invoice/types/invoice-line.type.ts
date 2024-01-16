import { CurrencyType } from 'core.v2/domain/@shared/types/currency.type';
import { CurrencyValueType } from '../../@shared/types/currency-value.type';

export type InvoiceLineType = {
  id: string;
  externalId: string;
  lineNumber: number;
  itemId?: string;
  itemExternalId: string;
  itemDescription: string;
  quantity: number;
  unitPrice: number;
  lineTotal: CurrencyValueType;
  currency: CurrencyType;
};

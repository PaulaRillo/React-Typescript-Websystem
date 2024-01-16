import { CurrencyValue } from 'core.v2/domain/invoice/value-object/currency-value';
import { useCallback } from 'react';
import { useAccuracy } from '../useAccuracy';

export const useFormatValue = () => {
  const { accuracy } = useAccuracy();

  const formatCurrencyValue = useCallback(
    (value: CurrencyValue) => {
      return `${value.invoiceCurrency.symbol} ${accuracy.total(value.value)}`;
    },
    [accuracy]
  );

  const formatCurrency = useCallback(
    (currencySymbol: string, value: string | number) => {
      return `${currencySymbol} ${accuracy.total(value)}`;
    },
    [accuracy]
  );

  const formatPercent = useCallback(
    (value: number) => `${accuracy.percent(value)} %`,
    [accuracy]
  );

  const format = useCallback(
    (value: number, method: AccuracyMethod) => {
      return accuracy[method](value);
    },
    [accuracy]
  );

  return { formatPercent, formatCurrencyValue, formatCurrency, format };
};

type AccuracyMethod =
  | 'total'
  | 'percent'
  | 'price'
  | 'quantity'
  | 'rate'
  | 'unit';

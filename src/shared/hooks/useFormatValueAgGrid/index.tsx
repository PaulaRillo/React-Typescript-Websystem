import { ValueFormatterParams } from 'ag-grid-community';
import { useCallback } from 'react';
import { getValue } from 'shared/utils/object/getValue';
import { useAccuracy } from '../useAccuracy';

export const useFormatValueAgGrid = () => {
  const { accuracy } = useAccuracy();

  const formatCurrencyValue = useCallback(
    (params: ValueFormatterParams, path = 'data.currency.symbol') => {
      if (!params?.value) {
        return '';
      }

      return `${getValue(params, path) || ''} ${accuracy.total(params.value)}`;
    },
    [accuracy]
  );

  const formatPercentValue = useCallback(
    (params: ValueFormatterParams) => {
      return `${accuracy.percent(params.value)} %`;
    },
    [accuracy]
  );

  const format = useCallback(
    (params: ValueFormatterParams, method: AccuracyMethod) => {
      return accuracy[method](params.value);
    },
    [accuracy]
  );

  return { formatCurrencyValue, formatPercentValue, format };
};

type AccuracyMethod =
  | 'total'
  | 'percent'
  | 'price'
  | 'quantity'
  | 'rate'
  | 'unit';

// How to use it
// on ag-grid colDef:
// valueFormatter: formatCurrencyValue
// valueFormatter: formatPercentValue,
// valueFormatter: (params) => format(params, 'total'),

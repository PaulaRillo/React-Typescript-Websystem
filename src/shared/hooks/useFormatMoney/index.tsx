import { useCallback } from 'react';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
import { formatMoney } from 'shared/utils/string/formatMoney/formatMoney';

export const useFormatMoney = () => {
  const { data } = useGetTenantSettings();

  const format = useCallback(
    (amount: number | string | undefined) => {
      return formatMoney({
        value: amount,
        decimals: data?.queryAccuracyDigits,
        decimalSeparator: data?.decimalSeparator,
        thousandsSeparator: data?.thousandsSeparator
      });
    },
    [
      data?.decimalSeparator,
      data?.queryAccuracyDigits,
      data?.thousandsSeparator
    ]
  );

  return { format };
};

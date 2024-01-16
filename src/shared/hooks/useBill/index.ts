import { useCallback } from 'react';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';
// This hook contains helper methods for working with bills and the ERP specific
// logic associated to them
export const useBill = () => {
  const { data } = useGetTenantSettings();

  /**
   *  This function gets the correct value for a bill based on the specified currency
   */
  const getValueByCurrency = useCallback(
    (
      currencyId: string,
      localValue: any,
      systemValue: any,
      foreignValue: any
    ) => {
      let correctValue: any;
      if (currencyId == data?.localCurrencyId) {
        correctValue = localValue;
      } else if (currencyId == data?.systemCurrencyId) {
        correctValue = systemValue;
      } else if (
        currencyId != data?.localCurrencyId &&
        currencyId != data?.systemCurrencyId
      ) {
        correctValue = foreignValue;
      }
      return correctValue;
    },
    [data]
  );

  return { getValueByCurrency };
};

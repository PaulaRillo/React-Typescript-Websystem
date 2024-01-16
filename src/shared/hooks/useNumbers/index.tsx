import Decimal from 'decimal.js';
import { useCallback } from 'react';
import { useGetTenantSettings } from 'shared/api/queries/useGetTenantSettings';

export const useNumbers = () => {
  const { data } = useGetTenantSettings();

  const htmlInputStepGenerator = useCallback(
    (decimalPlaces: number): string | undefined => {
      if (decimalPlaces <= 0) return;
      return `0.${'0'.repeat(decimalPlaces - 1)}1`; //ex: 0.01
    },
    []
  );

  const totalHtmlInputStep = useCallback((): string | undefined => {
    if (!data?.totalsAccuracyDigits) return;
    return htmlInputStepGenerator(data.totalsAccuracyDigits);
  }, [htmlInputStepGenerator, data?.totalsAccuracyDigits]);

  /**
   * This helper function convert a value into a Decimal object so that it can be
   * used in mathematical calculations and retain its accuracy and precision.
   * @param value the string that contains the numeric value to be converted
   */
  const n = useCallback((value?: Decimal.Value | null | undefined) => {
    return new Decimal(value || 0);
  }, []);

  // TODO: specify the rounding mode, decimal separator, and thousands separator from the backend

  /**
   * This helper function converts a value into a string that represents an decimal
   * with the proper number of decimal places and the correct rounding mode.
   * An amount is any value or nominal
   * @param value the string that contains the numeric value to be converted
   * @param decimalPlaces the amount of decimal places to round to (fixed-point) notation
   * @param roundingMode the type of rounding to use when representing the fixed-point notation
   */
  const displayDecimal = (
    value: Decimal.Value | null | undefined,
    decimalPlaces: number,
    roundingMode = Decimal.rounding
  ) => {
    return new Decimal(value ?? '0').toFixed(decimalPlaces, roundingMode);
  };

  /**
   * This helper function converts a value into a string that represents an total
   * value with the proper number of decimal places and the correct rounding mode.
   * An amount is any value or nominal
   * @param value the string that contains the numeric value to be converted
   */
  const displayTotal = useCallback(
    (value: Decimal.Value | null | undefined) => {
      return data?.totalsAccuracyDigits
        ? displayDecimal(value, data?.totalsAccuracyDigits)
        : null;
    },
    [data?.totalsAccuracyDigits]
  );

  /**
   * This helper function converts a value into a string that represents a percentage
   * with the proper number of decimal places and the correct rounding mode
   * @param value the string that contains the numeric value to be converted
   */
  const displayPercent = useCallback(
    (value: Decimal.Value | null | undefined) => {
      return data?.percentagesAccuracyDigits
        ? displayDecimal(value, data?.percentagesAccuracyDigits)
        : null;
    },
    [data?.percentagesAccuracyDigits]
  );

  /**
   * This helper function converts a value into a string that represents a price
   * value with the proper number of decimal places and the correct rounding mode.
   * @param value the string that contains the numeric value to be converted
   */
  const displayPrice = useCallback(
    (value: Decimal.Value | null | undefined) => {
      return data?.pricesAccuracyDigits
        ? displayDecimal(value, data?.pricesAccuracyDigits)
        : null;
    },
    [data?.pricesAccuracyDigits]
  );

  /**
   * This helper function converts a value into a string that represents a quantity
   * with the proper number of decimal places and the correct rounding mode
   * @param value the string that contains the numeric value to be converted
   */
  const displayQuantity = useCallback(
    (value: Decimal.Value | null | undefined) => {
      return data?.quantitiesAccuracyDigits
        ? displayDecimal(value, data?.quantitiesAccuracyDigits)
        : null;
    },
    [data?.quantitiesAccuracyDigits]
  );

  /**
   * This helper function converts a value into a string that represents a rate
   * with the proper number of decimal places and the correct rounding mode.
   * A rate is any exchange rate, indexes, and rates in marketing documents.
   * @param value the string that contains the numeric value to be converted
   */
  const displayRate = useCallback(
    (value: Decimal.Value | null | undefined) => {
      return data?.ratesAccuracyDigits
        ? displayDecimal(value, data?.ratesAccuracyDigits)
        : null;
    },
    [data?.ratesAccuracyDigits]
  );

  /**
   * This helper function converts a value into a string that represents a unit
   * with the proper number of decimal places and the correct rounding mode.
   * A unit is one such as volume, length, width, and height
   * @param value the string that contains the numeric value to be converted
   */
  const displayUnit = useCallback(
    (value: Decimal.Value | null | undefined) => {
      return data?.measuringUnitsAccuracyDigits
        ? displayDecimal(value, data?.measuringUnitsAccuracyDigits)
        : null;
    },
    [data?.measuringUnitsAccuracyDigits]
  );

  return {
    n,
    displayDecimal,
    displayTotal,
    displayPercent,
    displayPrice,
    displayQuantity,
    displayRate,
    displayUnit,
    totalHtmlInputStep
  };
};

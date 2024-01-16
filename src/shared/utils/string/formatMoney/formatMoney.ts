type FormatMoneyParams = {
  value: number | string | undefined;
  decimals?: number;
  thousandsSeparator?: string;
  decimalSeparator?: string;
};

export function formatMoney({
  value,
  decimals = 2,
  thousandsSeparator = ',',
  decimalSeparator = '.'
}: FormatMoneyParams): string {
  if (value == null) {
    return '';
  }

  const parsedValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(parsedValue)) {
    return '';
  }

  const [integerPart, decimalPart] = parsedValue.toFixed(decimals).split('.');
  const integerPartWithSeparators = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandsSeparator
  );

  const decimalPartWithSeparator =
    decimalSeparator === ','
      ? decimalPart?.replace(/\./g, decimalSeparator)
      : decimalPart;

  return decimalPartWithSeparator
    ? `${integerPartWithSeparators}${decimalSeparator}${decimalPartWithSeparator}`
    : integerPartWithSeparators;
}

// Exemplo de uso
// const formattedValue = formatMoney({
//   value: 12345.6789
//   decimals: 2,
//   thousandsSeparator: ',',
//   decimalSeparator: '.'
// });
// console.log(formattedValue); // "12,345.68"

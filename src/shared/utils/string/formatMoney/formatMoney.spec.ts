import { formatMoney } from './formatMoney';

describe('formatMoney', () => {
  it('should format a positive number with commas and dots separators and 2 decimals', () => {
    const value = 1234567.89;
    const params = {
      value,
      decimals: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    };
    const formattedValue = formatMoney(params);
    expect(formattedValue).toBe('1,234,567.89');
  });

  it('should format a negative number with commas and dots separators and 4 decimals', () => {
    const value = -1234567.8912;
    const params = {
      value,
      decimals: 4,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    };
    const formattedValue = formatMoney(params);
    expect(formattedValue).toBe('-1,234,567.8912');
  });

  it('should format a number with spaces as thousands separator and comma as decimal separator and 3 decimals', () => {
    const value = 9876543.2109;
    const params = {
      value,
      decimals: 3,
      thousandsSeparator: ' ',
      decimalSeparator: ','
    };
    const formattedValue = formatMoney(params);
    expect(formattedValue).toBe('9 876 543,211');
  });

  it('should format a number with a comma as decimal separator', () => {
    const value = '12345,78';
    const params = {
      value,
      decimals: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    };
    const formattedValue = formatMoney(params);
    expect(formattedValue).toBe('12,345.78');
  });

  it('should format a zero value with commas and dots separators and 2 decimals', () => {
    const value = 0;
    const params = {
      value,
      decimals: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    };
    const formattedValue = formatMoney(params);
    expect(formattedValue).toBe('0.00');
  });

  it('should return an empty string if the value is undefined', () => {
    const value = undefined;
    const params = {
      value,
      decimals: 2,
      thousandsSeparator: ',',
      decimalSeparator: '.'
    };
    const formattedValue = formatMoney(params);
    expect(formattedValue).toBe('');
  });
});

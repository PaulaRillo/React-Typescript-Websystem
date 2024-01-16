type Input = string | number;

export interface AccuracyDigitsInterface {
  total(value: Input): string;
  percent(value: Input): string;
  quantity(value: Input): string;
  price(value: Input): string;
  rate(value: Input): string;
  unit(value: Input): string;
}

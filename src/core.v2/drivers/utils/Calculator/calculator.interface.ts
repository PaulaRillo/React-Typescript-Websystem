type Value = string | number;

export interface CalculatorInterface {
  n(value?: Value): CalculatorInterface;
  plus(value?: Value): CalculatorInterface;
  minus(value?: Value): CalculatorInterface;
  multiply(value?: Value): CalculatorInterface;
  divide(value?: Value): CalculatorInterface;
  toFixed(places?: number): string;
  toNumber(): number;
  toString(): string;
}

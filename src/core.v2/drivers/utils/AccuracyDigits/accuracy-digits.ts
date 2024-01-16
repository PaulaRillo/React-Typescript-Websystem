import { TenantSettingsType } from '../../../domain/@shared/types/tenant-settings.type';
import { CalculatorInterface } from '../Calculator/calculator.interface';
import { AccuracyDigitsInterface } from './accuracy-digits.interface';

type Value = string | number;
export class AccuracyDigits implements AccuracyDigitsInterface {
  private accuracy: AccuracyDigitInput;

  constructor(
    private readonly settings: TenantSettingsType,
    private readonly calc: CalculatorInterface
  ) {
    this.accuracy = {
      total: this.settings?.totalsAccuracyDigits,
      percent: this.settings?.percentagesAccuracyDigits,
      price: this.settings?.pricesAccuracyDigits,
      quantity: this.settings?.quantitiesAccuracyDigits,
      rate: this.settings?.ratesAccuracyDigits,
      unit: this.settings?.measuringUnitsAccuracyDigits
    };
  }

  total(value: Value) {
    return this.calc.n(value).toFixed(this.accuracy.total);
  }

  percent(value: Value) {
    return this.calc.n(value).toFixed(this.accuracy.percent);
  }

  price(value: Value) {
    return this.calc.n(value).toFixed(this.accuracy.price);
  }

  quantity(value: Value) {
    return this.calc.n(value).toFixed(this.accuracy.quantity);
  }

  rate(value: Value) {
    return this.calc.n(value).toFixed(this.accuracy.rate);
  }

  unit(value: Value) {
    return this.calc.n(value).toFixed(this.accuracy.unit);
  }
}

export type AccuracyDigitInput = {
  total: number;
  percent: number;
  quantity: number;
  price: number;
  rate: number;
  unit: number;
};

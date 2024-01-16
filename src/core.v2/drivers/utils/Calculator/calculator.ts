import Decimal from 'decimal.js';
import { CalculatorInterface } from './calculator.interface';

type Value = string | number;
export class Calculator implements CalculatorInterface {
  private value: string | number;

  constructor() {
    this.value = 0;
  }

  n(value: Value) {
    this.value = new Decimal(value || 0).toString();
    return this;
  }

  plus(value: Value) {
    this.value = new Decimal(this.value).plus(value || 0).toString();
    return this;
  }

  minus(value: Value) {
    this.value = new Decimal(this.value).minus(value || 0).toString();
    return this;
  }

  multiply(value: Value) {
    this.value = new Decimal(this.value).times(value || 0).toString();
    return this;
  }

  divide(value: Value) {
    this.value = new Decimal(this.value).dividedBy(value || 0).toString();
    return this;
  }

  toFixed(places: number) {
    const result = new Decimal(this.value).toFixed(
      places,
      Decimal.ROUND_HALF_UP
    );
    this.reset();
    return result;
  }

  toNumber() {
    const result = new Decimal(this.value).toNumber();
    this.reset();
    return result;
  }

  toString() {
    const result = new Decimal(this.value).toString();
    this.reset();
    return result;
  }

  private reset() {
    this.value = 0;
  }
}

/*
 * Documentation for the Decimal.js library:
 * https://mikemcl.github.io/decimal.js
 */

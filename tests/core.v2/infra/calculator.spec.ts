import { CalculatorInterface } from '../../../src/core.v2/drivers/utils/Calculator/calculator.interface';
import { Calculator } from '../../../src/core.v2/drivers/utils/Calculator/calculator';

describe('Calculator', () => {
  jest.setTimeout(20000);

  let calc: CalculatorInterface;

  beforeAll(async () => {
    calc = new Calculator();
  });

  test('[minus] Should return right value for minus operation', () => {
    expect(calc.n(0.3).minus(0.1).toNumber()).toBe(0.2);
    expect(calc.n(100.99).minus(0.01).toNumber()).toBe(100.98);
    expect(calc.n(100.999).minus(0.001).toNumber()).toBe(100.998);
    expect(calc.n(100).minus(50).toNumber()).toBe(50);
    expect(calc.n(100).minus(50).toString()).toBe('50');
    expect(calc.n(100).minus(50)).toEqual({ value: '50' });
    expect(calc.minus(100).minus(50).toNumber()).toEqual(-100);
  });

  test('[plus] Should return right value for plus operation', () => {
    expect(calc.n(0.3).plus(0.1).toNumber()).toBe(0.4);
    expect(calc.n(100.99).plus(0.01).toNumber()).toBe(101);
    expect(calc.n(100.999).plus(0.001).toNumber()).toBe(101);
  });

  test('[multiply] Should return right value for multiply operation', () => {
    expect(calc.n(1000).multiply(0.1).toNumber()).toBe(100);
    expect(calc.n(100).multiply(0.1).toNumber()).toBe(10);
    expect(calc.n(10).multiply(0.1).toNumber()).toBe(1);
  });

  test('[divide] Should return right value for divide operation', () => {
    expect(calc.n(1000).divide(0.1).toNumber()).toBe(10000);
    expect(calc.n(100).divide(0.01).toNumber()).toBe(10000);
    expect(calc.n(10).divide(0.001).toNumber()).toBe(10000);
    expect(calc.n(10).divide(undefined).toNumber()).toBe(Infinity);
  });

  test('[toFixed] Should return right value for toFixed operation', () => {
    expect(calc.n(0.3).plus(0.1).toFixed(2)).toBe('0.40');
    expect(calc.n(100.99).plus(0.01).toFixed(2)).toBe('101.00');
    expect(calc.n(100.999).plus(0.001).toFixed(2)).toBe('101.00');
    expect(calc.n(100.999).plus(0.001).toFixed(undefined)).toBe('101');
  });

  test('[toNumber] Should return right value for toNumber operation', () => {
    expect(calc.n(0.3).plus(0.1).toNumber()).toBe(0.4);
    expect(calc.n(100.99).plus(0.01).toNumber()).toBe(101);
    expect(calc.n(100.999).plus(0.001).toNumber()).toBe(101);
  });

  test('[toNumber] Should reset state', () => {
    expect(calc.n(0.3).plus(0.1).toNumber()).toBe(0.4);
    expect(calc.plus(0.1).toNumber()).toBe(0.1);
    expect(calc.plus(0.1).toNumber()).not.toBe(0.2);
  });

  test('[toString] Should return right value for toString operation', () => {
    expect(calc.n(0.3).plus(0.1).toString()).toBe('0.4');
    expect(calc.n(100.99).plus(0.01).toString()).toBe('101');
    expect(calc.n(100.999).plus(0.001).toString()).toBe('101');
  });

  test('[toString] Should reset state', () => {
    expect(calc.n(0.3).plus(0.1).toString()).toBe('0.4');
    expect(calc.plus(0.1).toString()).toBe('0.1');
    expect(calc.plus(0.1).toString()).not.toBe('0.2');
  });

  test('[reset] Should reset value when finish', () => {
    expect(calc.n(0.3).plus(0.1).toNumber()).toBe(0.4);
    expect(calc.plus(0.1).toNumber()).toBe(0.1);
    expect(calc.plus(0.1).toNumber()).not.toBe(0.2);
    expect(calc.n(100.999).plus(0.001).toNumber()).toBe(101);
  });

  test('[n] Should return this', () => {
    expect(calc.n(0.3)).toEqual({ value: '0.3' });

    expect(calc.n(100.99).plus(0.01).n(0.1).toNumber()).toBe(0.1);
  });
});

/*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity
*/

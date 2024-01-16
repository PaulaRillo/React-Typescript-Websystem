import { CalculatorInterface } from 'core.v2/domain/@shared/calculator/calculator.interface';

type Input = {
  total: number;
  balance: number;
};

type Output = number;

export type EndingBalancePaymentRequestCalculatorInterface =
  CalculatorInterface<Input, Output>;

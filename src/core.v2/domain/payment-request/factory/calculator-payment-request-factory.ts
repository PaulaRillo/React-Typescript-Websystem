import { EndingBalancePaymentRequestCalculator } from '../calculator/ending-balance-payment-request-calculator';
import { EndingBalancePaymentRequestCalculatorInterface } from '../calculator/ending-balance-payment-request-calculator.interface';
import { TotalPaymentRequestCalculator } from '../calculator/total-payment-request-calculator';
import { TotalPaymentRequestCalculatorInterface } from '../calculator/total-payment-request-calculator.interface';

export class CalculatorPaymentRequestFactory {
  static createTotalCalculator(): TotalPaymentRequestCalculatorInterface {
    return new TotalPaymentRequestCalculator();
  }

  static createEndingBalanceCalculator(): EndingBalancePaymentRequestCalculatorInterface {
    return new EndingBalancePaymentRequestCalculator();
  }
}

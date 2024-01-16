import { UtilsFactory } from '../../../drivers/utils/utils-factory';
import { EndingBalancePaymentRequestCalculatorInterface } from './ending-balance-payment-request-calculator.interface';

type Input = {
  total: number;
  balance: number;
};

export class EndingBalancePaymentRequestCalculator
  implements EndingBalancePaymentRequestCalculatorInterface
{
  calculate({ total, balance }: Input): number {
    if (!total) return 0;
    const utils = new UtilsFactory();
    const calc = utils.createCalculator();
    return calc.n(balance).minus(total).toNumber();
  }
}

import { Invoice } from 'core.v2/domain/invoice/entity/invoice';
import { UtilsFactory } from '../../../drivers/utils/utils-factory';
import { TotalPaymentRequestCalculatorInterface } from './total-payment-request-calculator.interface';

export class TotalPaymentRequestCalculator
  implements TotalPaymentRequestCalculatorInterface
{
  calculate(invoices: Invoice[]): number {
    const utils = new UtilsFactory();
    const calc = utils.createCalculator();
    const total = invoices.reduce((acc, invoice) => {
      return calc.n(acc).plus(invoice.paymentAmount).toNumber();
    }, 0);

    return total;
  }
}

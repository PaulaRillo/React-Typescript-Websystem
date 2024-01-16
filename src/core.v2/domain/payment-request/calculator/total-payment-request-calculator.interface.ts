import { CalculatorInterface } from 'core.v2/domain/@shared/calculator/calculator.interface';
import { Invoice } from 'core.v2/domain/invoice/entity/invoice';

export type TotalPaymentRequestCalculatorInterface = CalculatorInterface<
  Invoice[],
  number
>;

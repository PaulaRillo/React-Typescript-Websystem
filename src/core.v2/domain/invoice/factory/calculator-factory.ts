import { CalculatorInterface } from 'core.v2/domain/@shared/calculator/calculator.interface';
import {
  BalanceDueCalculator,
  InputBalanceDueCalculatorDTO,
  OutputCalculateBalanceDueDTO
} from '../calculator/balance-due-calculator';
import {
  InputSubtotalCalculatorDTO,
  OutputSubtotalCalculatorDTO,
  SubtotalCalculator
} from '../calculator/subtotal-calculator';

//prettier-ignore
export class InvoiceCalculatorFactory {
  static createBalanceDueCalculator(): CalculatorInterface<InputBalanceDueCalculatorDTO, OutputCalculateBalanceDueDTO> {
    return new BalanceDueCalculator();
  }

  static createSubtotalCalculator(): CalculatorInterface<InputSubtotalCalculatorDTO, OutputSubtotalCalculatorDTO> {
    return new SubtotalCalculator();
  }
}

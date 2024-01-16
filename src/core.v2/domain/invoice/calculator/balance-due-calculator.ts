import type { CalculatorInterface } from 'core.v2/domain/@shared/calculator/calculator.interface';
import { UtilsFactory } from '../../../drivers/utils/utils-factory';
import { CurrencyValue } from '../value-object/currency-value';

export class BalanceDueCalculator
  implements CalculatorInterface<Input, Output>
{
  calculate({ invoiceTotal, paidToDateAmount }: Input): Output {
    const utils = new UtilsFactory();
    const calc = utils.createCalculator();

    const localCurrency = calc
      .n(invoiceTotal.localCurrency)
      .minus(paidToDateAmount.localCurrency)
      .toNumber();

    const systemCurrency = calc
      .n(invoiceTotal.systemCurrency)
      .minus(paidToDateAmount.systemCurrency)
      .toNumber();

    const foreignCurrency = calc
      .n(invoiceTotal.foreignCurrency)
      .minus(paidToDateAmount.foreignCurrency)
      .toNumber();

    return {
      localCurrency,
      systemCurrency,
      foreignCurrency
    };
  }
}

type Input = InputBalanceDueCalculatorDTO;
type Output = OutputCalculateBalanceDueDTO;

export type InputBalanceDueCalculatorDTO = {
  invoiceTotal: CurrencyValue;
  paidToDateAmount: CurrencyValue;
};

export type OutputCalculateBalanceDueDTO = {
  localCurrency: number;
  systemCurrency: number;
  foreignCurrency: number;
};

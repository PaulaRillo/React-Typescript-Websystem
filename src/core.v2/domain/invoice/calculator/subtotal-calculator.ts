import { CalculatorInterface } from 'core.v2/domain/@shared/calculator/calculator.interface';
import { UtilsFactory } from '../../../drivers/utils/utils-factory';
import { InvoiceLine } from '../value-object/invoice-line';

export class SubtotalCalculator implements CalculatorInterface<Input, Output> {
  calculate(invoiceLines: Input): Output {
    const utils = new UtilsFactory();
    const calc = utils.createCalculator();

    let localCurrency = 0;
    let systemCurrency = 0;
    let foreignCurrency = 0;

    for (const invoiceLine of invoiceLines) {
      localCurrency = calc
        .n(localCurrency)
        .plus(invoiceLine.lineTotal?.localCurrency)
        .toNumber();
      systemCurrency = calc
        .n(systemCurrency)
        .plus(invoiceLine.lineTotal?.systemCurrency)
        .toNumber();
      foreignCurrency = calc
        .n(foreignCurrency)
        .plus(invoiceLine.lineTotal?.foreignCurrency)
        .toNumber();
    }

    return {
      localCurrency,
      systemCurrency,
      foreignCurrency
    };
  }
}

type Input = InputSubtotalCalculatorDTO;
type Output = OutputSubtotalCalculatorDTO;

export type InputSubtotalCalculatorDTO = InvoiceLine[];

export type OutputSubtotalCalculatorDTO = {
  localCurrency: number;
  systemCurrency: number;
  foreignCurrency: number;
};

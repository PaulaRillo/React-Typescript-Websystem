import { TenantSettingsType } from 'core.v2/domain/@shared/types/tenant-settings.type';
import { AccuracyDigits } from './AccuracyDigits/accuracy-digits';
import { AccuracyDigitsInterface } from './AccuracyDigits/accuracy-digits.interface';
import { Calculator } from './Calculator/calculator';
import { CalculatorInterface } from './Calculator/calculator.interface';
import { StorageInterface } from './Storage/storage.interface';
import { StorageMemory } from './Storage/storage-memory';
import { UtilsFactoryInterface } from './utils-factory.interface';

export class UtilsFactory implements UtilsFactoryInterface {
  createCalculator(): CalculatorInterface {
    return new Calculator();
  }

  createAppStorage(): StorageInterface {
    return StorageMemory.getInstance();
  }

  createAccuracyDigits(settings: TenantSettingsType): AccuracyDigitsInterface {
    return new AccuracyDigits(settings, this.createCalculator());
  }
}

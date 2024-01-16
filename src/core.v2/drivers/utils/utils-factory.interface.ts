import { TenantSettingsType } from 'core.v2/domain/@shared/types/tenant-settings.type';
import { AccuracyDigitsInterface } from './AccuracyDigits/accuracy-digits.interface';
import { CalculatorInterface } from './Calculator/calculator.interface';
import { StorageInterface } from './Storage/storage.interface';

export interface UtilsFactoryInterface {
  createCalculator(): CalculatorInterface;
  createAppStorage(): StorageInterface;
  createAccuracyDigits(settings: TenantSettingsType): AccuracyDigitsInterface;
}

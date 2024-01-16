import core from 'core.v2';
import { TOptions } from 'i18next';

export const tr = (key: string, params?: TOptions): string => {
  return core.translate.translate(key, params);
};

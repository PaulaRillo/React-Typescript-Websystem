import { InitOptions } from 'i18next';
import { tr } from '../../../src/core/infra/translate';
import { I18nTranslate } from '../../../src/core/infra/translate/I18nTranslate';
import { languages as fakeLanguages } from './languages';

export const initOptions: InitOptions = {
  debug: false,
  defaultNS: 'translations',
  ns: 'translations',
  fallbackLng: 'en',
  resources: fakeLanguages
};

describe('Translate - I18nTranslate', () => {
  test('Should translate english to portuguese', () => {
    const i18n = I18nTranslate.getInstance({ ...initOptions, lng: 'pt' });
    const sut = i18n.t('dashboard.title');
    expect(sut).toBe('Painel de controle');
    I18nTranslate.clear();
  });

  test('Should translate english to spanish', () => {
    const i18n = I18nTranslate.getInstance({ ...initOptions, lng: 'es' });
    const sut = i18n.t('dashboard.title');
    expect(sut).toBe('Panel de control');
    I18nTranslate.clear();
  });

  test('Should translate english to english', () => {
    const i18n = I18nTranslate.getInstance({ ...initOptions, lng: 'en' });
    const sut = i18n.t('dashboard.title');
    expect(sut).toBe('Dashboard');
    I18nTranslate.clear();
  });

  test('Should not create new I18nTranslate instance', () => {
    I18nTranslate.getInstance({ ...initOptions, lng: 'pt' });
    const i18n2 = I18nTranslate.getInstance({ ...initOptions, lng: 'es' });
    const sut = i18n2.t('dashboard.title');
    expect(sut).toBe('Painel de controle');
    I18nTranslate.clear();
  });
});

describe('Translate - t function', () => {
  test('Should translate english to english using t function', () => {
    I18nTranslate.getInstance({ ...initOptions, lng: 'en' });
    const sut = tr('dashboard.title');
    expect(sut).toBe('Dashboard');
    I18nTranslate.clear();
  });

  test('Should translate english to portuguese using t function', () => {
    I18nTranslate.getInstance({ ...initOptions, lng: 'pt' });
    const sut = tr('dashboard.title');
    expect(sut).toBe('Painel de controle');
    I18nTranslate.clear();
  });

  test('Should translate english to spanish using t function', () => {
    I18nTranslate.getInstance({ ...initOptions, lng: 'es' });
    const sut = tr('dashboard.title');
    expect(sut).toBe('Panel de control');
    I18nTranslate.clear();
  });
});

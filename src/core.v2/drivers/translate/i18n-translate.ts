import i18n, { i18n as Ii18n, Resource, TOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { TranslateInterface } from './translate.interface';

export class I18nTranslate implements TranslateInterface {
  private readonly _i18n: Ii18n;

  private constructor(private readonly languages: Resource) {
    this._i18n = i18n;
    this._i18n.use(LanguageDetector).use(initReactI18next).init({
      debug: false,
      defaultNS: 'translations',
      ns: 'translations',
      fallbackLng: 'en',
      resources: this.languages
    });
  }

  translate(key: string, params?: TOptions): string {
    return this._i18n.t(key, params);
  }

  static getInstance(languages: Resource): I18nTranslate {
    if (!this.instance) {
      this.instance = new I18nTranslate(languages);
    }
    return this.instance;
  }

  static instance: I18nTranslate | undefined;

  static clear() {
    I18nTranslate.instance = undefined;
  }
}

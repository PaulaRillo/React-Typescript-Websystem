import { en } from '../languages/en';
import { es } from '../languages/es';
import { pt } from '../languages/pt';
import { ControllerFactory } from './adapters/controllers/controller-factory';
import { GatewayFactoryHttp } from './adapters/gateways/gateway-factory-http';
import { MapperFactory } from './adapters/mappers/mapper-factory';
import { Core } from './core';
import { PaymentRequest } from './domain/payment-request/entity/payment-request';
import { AmplifyAuth } from './drivers/auth/amplify-auth';
import { HttpClientFactory } from './drivers/httpClient/http-client-factory';
import { AmplifyServer } from './drivers/server/amplify/amplify-server';
import { serverSettings } from './drivers/server/amplify/server-settings';
import { I18nTranslate } from './drivers/translate/i18n-translate';
import { store } from './drivers/utils/Store/store';
import { UtilsFactory } from './drivers/utils/utils-factory';

const server = new AmplifyServer();
server.configure(serverSettings);

const auth = new AmplifyAuth();

const translate = I18nTranslate.getInstance({
  en: { translations: en },
  pt: { translations: pt },
  es: { translations: es }
});

const paymentRequest = PaymentRequest.getInstance();
store.setPaymentRequest(paymentRequest);

const httpClientFactory = new HttpClientFactory();
const mapperFactory = new MapperFactory();
const gatewayFactory = new GatewayFactoryHttp(auth, httpClientFactory, mapperFactory, store); //prettier-ignore
// const gatewayFactory = new GatewayFactoryMemory(mapperFactory, store); //prettier-ignore
const controllerFactory = new ControllerFactory(gatewayFactory);
const utils = new UtilsFactory();

export const core = new Core(store, auth, utils, translate, controllerFactory);

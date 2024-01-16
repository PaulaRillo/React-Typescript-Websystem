import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { AccuracyDigits } from '../../../src/core.v2/drivers/utils/AccuracyDigits/accuracy-digits';
import { Calculator } from '../../../src/core.v2/drivers/utils/Calculator/calculator';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';

describe('AccuracyDigits', () => {
  jest.setTimeout(20000);

  let accuracy: AccuracyDigits;

  beforeAll(async () => {
    await serverInit();
    const httpClientFactory = new HttpClientFactory();
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryHttp(
      auth,
      httpClientFactory,
      mapperFactory,
      store
    );
    const tenantGateway = gatewayFactory.createTenantGateway();
    const settings = await tenantGateway.getSettings();
    const calc = new Calculator();
    accuracy = new AccuracyDigits(settings, calc);
  });

  test('[total] Should return right number of decimal places', () => {
    expect(accuracy.total(1.2345)).toBe('1.23');
  });

  test('[percent] Should return right number of decimal places', () => {
    expect(accuracy.percent(1.2345)).toBe('1.235');
  });

  test('[price] Should return right number of decimal places', () => {
    expect(accuracy.price(1.2345)).toBe('1.23');
  });

  test('[quantity] Should return right number of decimal places', () => {
    expect(accuracy.quantity(1.2345)).toBe('1.235');
  });

  test('[rate] Should return right number of decimal places', () => {
    expect(accuracy.rate(1.2345)).toBe('1.234500');
  });

  test('[unit] Should return right number of decimal places', () => {
    expect(accuracy.unit(1.2345)).toBe('1.235');
  });
});

/*
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Infinity
*/

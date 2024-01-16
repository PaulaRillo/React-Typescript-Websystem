import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { InvoiceGatewayInterface } from '../../../src/core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';
import { GatewayFactoryMemory } from './../../../src/core.v2/adapters/gateways/gateway-factory-memory';

describe('InvoiceGatewayHttp', () => {
  jest.setTimeout(200000);
  let invoiceGateway: InvoiceGatewayInterface;

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
    invoiceGateway = gatewayFactory.createInvoiceGateway();
  });

  test('Should find a Invoice', async () => {
    const invoiceId = 'a8fc8009-0881-4716-9a58-51ba3a111b43';
    const invoice = await invoiceGateway.find(invoiceId);

    expect(invoice).toBeDefined();
    expect(invoice.id).toBe('a8fc8009-0881-4716-9a58-51ba3a111b43');
    expect(invoice.visualId).toBe('1219');
    expect(invoice.externalId).toBe('1219');
    expect(invoice.externalApInvoiceNumber).toBe('1175');
    expect(invoice.invoiceStatus).toBe('Open');
    expect(invoice.invoiceType).toBe('3');
    expect(invoice.currency).toEqual({
      id: '$',
      externalId: '$',
      iso4217Alpha3: 'USD',
      name: 'US Dollar',
      symbol: '$'
    });
  });

  test('Should list Invoices', async () => {
    const response = await invoiceGateway.list(0, 20);
    expect(response).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('Should get Invoices history on memory', async () => {
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryMemory(mapperFactory, store);
    const invoiceGateway = gatewayFactory.createInvoiceGateway();
    const response = await invoiceGateway.history({
      invoiceId: '677346f2-df72-4b2c-b180-372794f4cf55',
      year: '2023'
    });

    expect(response).toBeDefined();
  });

  test('Should get Invoices history on http', async () => {
    const response = await invoiceGateway.history({
      invoiceId: 'a8fc8009-0881-4716-9a58-51ba3a111b43',
      year: '2023'
    });

    expect(response).toBeDefined();
  });
});

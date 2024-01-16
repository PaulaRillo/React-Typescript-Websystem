import { GatewayFactoryMemory } from '../../../src/core.v2/adapters/gateways/gateway-factory-memory';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { Invoice } from '../../../src/core.v2/domain/invoice/entity/invoice';
import { InvoiceGatewayInterface } from '../../../src/core.v2/domain/invoice/gateway/invoice-gateway.interface';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';

describe('InvoiceGatewayMemory', () => {
  jest.setTimeout(20000);

  let invoiceGateway: InvoiceGatewayInterface;

  beforeAll(async () => {
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryMemory(mapperFactory, store);
    invoiceGateway = gatewayFactory.createInvoiceGateway();
  });

  test('Should find a Invoice', async () => {
    const invoiceId = 'c0d66998-5863-41a3-bf01-5db37dd48cfa';
    const invoice = await invoiceGateway.find(invoiceId);

    expect(invoice).toBeDefined();
    expect(invoice).toBeInstanceOf(Invoice);
    expect(invoice.id).toEqual(invoiceId);
    expect(invoice.visualId).toBe('1219');
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
    expect(invoice.invoiceFrom).toEqual({
      id: '323eb529-bdea-444f-aab8-75d1b4c965e7',
      externalId: 'V50000',
      visualId: '850956788',
      name: 'Sea Corp'
    });
    expect(invoice.summary.invoiceTotal.value).toBe(3916.78);
    expect(invoice.summary.balanceDue.value).toBe(2716.78);
  });

  test.only('Should get a list of invoice with same vendor', async () => {
    const invoices = await invoiceGateway.query({ vendorName: 'Sea' });

    expect(invoices).toBeDefined();
    expect(invoices.data.length).toBe(3);
  });
});

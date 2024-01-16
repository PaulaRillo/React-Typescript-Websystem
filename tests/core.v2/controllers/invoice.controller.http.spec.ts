import { InvoiceController } from '../../../src/core.v2/adapters/controllers/invoice/invoice-controller';
import { InvoiceControllerInterface } from '../../../src/core.v2/adapters/controllers/invoice/invoice-controller.interface';
import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';

describe('InvoiceControllerHttp', () => {
  jest.setTimeout(20000);

  let invoiceController: InvoiceControllerInterface;

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
    invoiceController = new InvoiceController(gatewayFactory);
  });

  test('Should get a Invoice entity by id', async () => {
    const invoiceId = '53914868-ebd2-46fc-ac02-097443aba06d';
    const invoice = await invoiceController.find(invoiceId);
    expect(invoice.id).toBe(invoiceId);
  });

  test('Should get a Invoice list', async () => {
    const response = await invoiceController.list();

    expect(response).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);
  });

  test('Should list Invoices by vendor id', async () =>{
    const vendorId = '7127f050-e8f0-40a7-8e16-b4185a7bbee5';
    const response = await invoiceController.listByVendor(vendorId);

    expect(response).toBeDefined();
    expect(response.data[0].vendorId).toBe(vendorId);
    expect(response.data.length).toBeGreaterThan(0);
  })
});

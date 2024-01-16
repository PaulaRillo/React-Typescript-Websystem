import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { VendorGatewayInterface } from '../../../src/core.v2/adapters/gateways/vendor/vendor-gateway.interface';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';
import { VendorMapperInterface } from '../../../src/core.v2/adapters/mappers/vendor/vendor-mapper.interface';

describe('VendorGatewayHttp', () => {
  jest.setTimeout(20000);

  let vendorGatewayHttp: VendorGatewayInterface;
  let vendorMapper: VendorMapperInterface;

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

    vendorMapper = mapperFactory.createVendorMapper();

    vendorGatewayHttp = gatewayFactory.createVendorGateway();
  });

  test('Should find a Vendor by its visual id', async () => {
    const visualId = '781590800';
    const vendor = await vendorGatewayHttp.find(visualId);

    expect(vendor.id).toBe('18e935f7-c834-4cc2-8125-855c5af2c932');
    expect(vendor.externalId).toBe('V10000');
    expect(vendor.trade_name).toBe('Acme Associates');
    expect(vendor.email).toBe('info@acme.sap.com');
  });

  test('Should list Vendors', async () => {
    const vendors = await vendorGatewayHttp.list('0', '20');

    expect(vendors).toBeDefined();
    expect(vendors.data.length).toBeGreaterThan(0);

    vendors.data.forEach((element) => {
      expect(element.id).toBeDefined();
      expect(element.external_id).toBeDefined();
      expect(element.trade_name).toBeDefined();
      expect(element.email).toBeDefined();
    });
  });
});

import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { ReportsGatewayInterface } from '../../../src/core.v2/adapters/gateways/reports/reports-gateway.interface';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { VendorMapperInterface } from '../../../src/core.v2/adapters/mappers/vendor/vendor-mapper.interface';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';

describe('ReportsGatewayHttp', () => {
  jest.setTimeout(20000);

  let reportsGatewayHttp: ReportsGatewayInterface;
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
    reportsGatewayHttp = gatewayFactory.createReportsGateway();
  });

  test('Should return vendor report', async () => {
    const visualId = '781590800';
    const reportsVendor = await reportsGatewayHttp.vendorQuery({});

    console.log('REPORTS VENDOR --> ', reportsVendor);
  });
});

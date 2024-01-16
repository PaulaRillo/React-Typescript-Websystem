import { TenantGatewayHttp } from '../../../src/core.v2/adapters/gateways/tenant/tenant-gateway-http';
import { TenantGatewayInterface } from '../../../src/core.v2/adapters/gateways/tenant/tenant-gateway.interface';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { storageMemory } from '../../../src/core.v2/drivers/utils/Storage/storage-memory';
import { serverInit } from '../../utils/serverInit';
import { HttpClientFactory } from './../../../src/core.v2/drivers/httpClient/http-client-factory';

describe('TenantGatewayHttp', () => {
  jest.setTimeout(20000);

  let tenantGateway: TenantGatewayInterface;

  beforeAll(async () => {
    await serverInit();
    const httpClientFactory = new HttpClientFactory();
    const mapperFactory = new MapperFactory();
    tenantGateway = new TenantGatewayHttp(httpClientFactory, mapperFactory);
  });

  beforeEach(() => {
    storageMemory.clear();
  });

  test('Should get settings', async () => {
    const settings = await tenantGateway.getSettings();
    expect(settings).toBeDefined();
  });

  // TODO: fix this test
  // test('Should get settings from localStorage', async () => {
  //   storageMemory.set(
  //     StorageKey.TENANT_SETTINGS,
  //     JSON.stringify({ company_name: 'localStorage' })
  //   );
  //
  //   const settings = (await tenantGateway.getSettings()) as {
  //     company_name: string;
  //   };
  //
  //   expect(settings).toBeDefined();
  //   expect(settings.company_name).toBe('localStorage');
  // });

  test('Should get cash flows', async () => {
    const cashFlows = await tenantGateway.getCashFlows();
    expect(cashFlows).toBeDefined();
    expect(cashFlows.length).toBeGreaterThan(0);
    expect(cashFlows[0].id).toBeDefined();
    expect(cashFlows[0].externalId).toBeDefined();
    expect(cashFlows[0].name).toBeDefined();
  });

  test('Should get quotas', async () => {
    const quotas = await tenantGateway.getQuotas();
    expect(quotas).toBeDefined();
  });

  test('Should get sync status', async () => {
    const data = await tenantGateway.getSyncStatus();
    expect(data).toBeDefined();
  });
});

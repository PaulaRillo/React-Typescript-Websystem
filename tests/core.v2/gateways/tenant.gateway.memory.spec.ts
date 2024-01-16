import { TenantGatewayMemory } from '../../../src/core.v2/adapters/gateways/tenant/tenant-gateway-memory';
import { TenantGatewayInterface } from '../../../src/core.v2/adapters/gateways/tenant/tenant-gateway.interface';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { StorageKey } from '../../../src/core.v2/domain/@shared/settings/constants.enum';
import { storageMemory } from '../../../src/core.v2/drivers/utils/Storage/storage-memory';

describe('TenantGatewayMemory', () => {
  jest.setTimeout(20000);

  let tenantGateway: TenantGatewayInterface;

  beforeAll(async () => {
    const mapperFactory = new MapperFactory();
    tenantGateway = new TenantGatewayMemory(mapperFactory);
  });

  beforeEach(() => {
    storageMemory.clear();
  });

  test('Should get settings', async () => {
    const settings = await tenantGateway.getSettings();
    expect(settings).toBeDefined();
    storageMemory.clear();
  });

  test('Should get settings from localStorage', async () => {
    storageMemory.clear();
    storageMemory.set(
      StorageKey.TENANT_SETTINGS,
      JSON.stringify({ company_name: 'localStorage' })
    );
    const settings = (await tenantGateway.getSettings()) as {
      company_name: string;
    };
    expect(settings).toBeDefined();
    expect(settings.company_name).toBe('localStorage');
  });

  test('Should get CashFlows', async () => {
    const cashFlows = await tenantGateway.getCashFlows();

    expect(cashFlows).toBeDefined();
    expect(cashFlows.length).toBeGreaterThan(0);
    expect(cashFlows[0].id).toBeDefined();
    expect(cashFlows[0].externalId).toBeDefined();
    expect(cashFlows[0].name).toBeDefined();
  });

  test.only('Should get sync status', async () => {
    const syncStatus = await tenantGateway.getSyncStatus();
    expect(syncStatus).toBeDefined();
  });
});

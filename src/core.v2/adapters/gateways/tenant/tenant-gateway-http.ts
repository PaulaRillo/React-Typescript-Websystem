import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { CashFlowMapperInterface } from 'core.v2/adapters/mappers/tenant/cash-flow-mapper.interface';
import { TenantSettingsMapperInterface } from 'core.v2/adapters/mappers/tenant/tenant-settings-mapper.interface';
import { CashFlowType } from 'core.v2/domain/@shared/types/cash-flow.type';
import { HttpClientFactoryInterface } from 'core.v2/drivers/httpClient/http-client-factory.interface';
import {
  SyncStateOutput,
  TenantSyncStatusMapper
} from '../../../adapters/mappers/tenant/tenant-sync-status-mapper';
import { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import {
  AwsApiName,
  StorageKey
} from '../../../domain/@shared/settings/constants.enum';
import { TenantSettingsType } from '../../../domain/@shared/types/tenant-settings.type';
import { storageMemory } from '../../../drivers/utils/Storage/storage-memory';
import { TenantGatewayInterface } from './tenant-gateway.interface';

export class TenantGatewayHttp implements TenantGatewayInterface {
  private readonly httpClient: HttpClientInterface;
  private readonly storageKey: string;
  private readonly settingsMapper: TenantSettingsMapperInterface;
  private readonly cashFlowMapper: CashFlowMapperInterface;

  constructor(
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly mapperFactory: MapperFactoryInterface
  ) {
    this.storageKey = StorageKey.TENANT_SETTINGS;
    this.httpClient = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
    this.settingsMapper = this.mapperFactory.createTenantSettingsMapper();
    this.cashFlowMapper = this.mapperFactory.createCashFlowMapper();
  }

  async getSyncStatus(): Promise<SyncStateOutput> {
    const syncStatus: any = await this.httpClient.get('/tenant/sync-status');
    const orderedSteps = Object.values(syncStatus?.sync_status?.step).sort(
      ({ position: a }: any, { position: b }: any) => a - b
    );
    const mapper = new TenantSyncStatusMapper();
    const mappedOrderedSteps = orderedSteps.map((item: any) =>
      mapper.StepsRawToDomain(item)
    );

    const mappedGlobalState = mapper.GlobalStateToDomain(syncStatus?.sync_status.global_state); //prettier-ignore
    return {
      globalState: mappedGlobalState,
      steps: mappedOrderedSteps
    };
  }

  async getQuotas(): Promise<any> {
    return await this.httpClient.get('/quotas');
  }

  async getSettings(): Promise<TenantSettingsType> {
    const endpoint = `/settings/company`;
    const storageSettings = storageMemory.get(this.storageKey); //TODO: should invert dependency
    if (storageSettings) {
      return JSON.parse(storageSettings) as TenantSettingsType;
    }
    const settingsData = await this.httpClient.get(endpoint);
    const settingsMapped = this.settingsMapper.toDomain(settingsData);
    storageMemory.set(this.storageKey, JSON.stringify(settingsMapped));

    return settingsMapped;
  }

  async getCashFlows(): Promise<CashFlowType[]> {
    const endpoint = `/cash-flows`;
    const cashFlowsData = await this.httpClient.get<unknown[]>(endpoint);
    return cashFlowsData.map((cashFlow) =>
      this.cashFlowMapper.toDomain(cashFlow)
    );
  }
}

import { GatewayFactoryInterface } from 'core.v2/adapters/gateways/gateway-factory.interface';
import { TenantGatewayInterface } from 'core.v2/adapters/gateways/tenant/tenant-gateway.interface';
import { SyncStateOutput } from 'core.v2/adapters/mappers/tenant/tenant-sync-status-mapper';
import { TenantSettingsType } from '../../../domain/@shared/types/tenant-settings.type';
import { CashFlowType } from './../../../domain/@shared/types/cash-flow.type';
import { TenantControllerInterface } from './tenant-controller.interface';

export class TenantController implements TenantControllerInterface {
  private readonly tenantGateway: TenantGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.tenantGateway = this.gatewayFactory.createTenantGateway();
  }

  async getSyncStatus(): Promise<SyncStateOutput> {
    return await this.tenantGateway.getSyncStatus();
  }

  async getQuotas(): Promise<TenantSettingsType> {
    return await this.tenantGateway.getQuotas();
  }

  async getSettings(): Promise<TenantSettingsType> {
    return await this.tenantGateway.getSettings();
  }

  async getCashFlows(): Promise<CashFlowType[]> {
    return await this.tenantGateway.getCashFlows();
  }
}

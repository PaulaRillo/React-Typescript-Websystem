import { GatewayFactoryInterface } from 'core.v2/adapters/gateways/gateway-factory.interface';
import { SetupControllerInterface } from './setup-controller.interface';
import { CurrencyType } from '../../../domain/@shared/types/currency.type';
import { SetupGatewayInterface } from '../../gateways/setup/setup-gateway.interface';

export class SetupController implements SetupControllerInterface {
  private readonly setupGateway: SetupGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.setupGateway = this.gatewayFactory.createSetupGateway();
  }

  public async getCurrencies(): Promise<CurrencyType[]> {
    return await this.setupGateway.getCurrencies();
  }
  public async configureCurrency(
    currency: CurrencyType
  ): Promise<CurrencyType> {
    return await this.setupGateway.configureCurrency(currency);
  }
  public async getSystemManagedCurrencies(): Promise<CurrencyType[]> {
    return await this.setupGateway.getSystemManagedCurrencies();
  }
  public async getTenantConfigurations(): Promise<boolean> {
    return await this.setupGateway.getTenantConfigurations();
  }
  public async getConfiguredCurrencies(): Promise<CurrencyType[]> {
    return await this.setupGateway.getConfiguredCurrencies();
  }
}

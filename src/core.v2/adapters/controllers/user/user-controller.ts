import { UserGatewayInterface } from 'core.v2/adapters/gateways/user/user-gateway.interface';
import { LoggedUser } from 'core.v2/domain/logged-user/entity/logged-user';
import { User } from '../../../domain/user/entity/user';
import type { GatewayFactoryInterface } from '../../gateways/gateway-factory.interface';
import type { UserControllerInterface } from './user-controller.interface';

export class UserController implements UserControllerInterface {
  private readonly userGateway: UserGatewayInterface;
  private readonly loggedUserGateway: UserGatewayInterface;

  constructor(private readonly gatewayFactory: GatewayFactoryInterface) {
    this.userGateway = this.gatewayFactory.createUserGateway();
    this.loggedUserGateway = this.gatewayFactory.createUserGateway();
  }

  async find(invoiceId: string): Promise<User> {
    return await this.userGateway.find(invoiceId);
  }

  async list(skip?: string, take?: string): Promise<User[]> {
    return await this.userGateway.list(skip, take);
  }

  async create(data: any): Promise<any> {
    return await this.userGateway.create(data);
  }

  async disable(id: string, email: string): Promise<any> {
    return await this.userGateway.disable(id, email);
  }

  async enable(id: string, email: string): Promise<any> {
    return await this.userGateway.enable(id, email);
  }  

  async getLoggedUser(): Promise<LoggedUser> {
    return await this.loggedUserGateway.getLoggedUser();
  }
}

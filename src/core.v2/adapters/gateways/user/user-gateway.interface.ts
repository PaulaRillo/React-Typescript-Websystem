import { User } from 'core.v2/domain/user/entity/user';
import { LoggedUser } from '../../../domain/logged-user/entity/logged-user';

export interface UserGatewayInterface {
  getLoggedUser(): Promise<LoggedUser>;
  find(id: string): Promise<User>;
  list(skip?: string, take?: string): Promise<User[]>;
  create(data: any): Promise<any>;
  disable(id: string, email: string): Promise<any>;
  enable(id: string, email: string): Promise<any>;
}

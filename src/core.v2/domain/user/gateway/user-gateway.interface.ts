import { User } from '../entity/user';
export interface UserGatewayInterface {
  find(id: string): Promise<User>;
  list(skip?: string, take?: string): Promise<User>;
  create(data: any): Promise<any>;
}

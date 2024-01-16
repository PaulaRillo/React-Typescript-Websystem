import { LoggedUser } from 'core.v2/domain/logged-user/entity/logged-user';
import { User } from 'core.v2/domain/user/entity/user';

export interface UserControllerInterface {
  find(invoiceId: string): Promise<User>;
  list(skip?: string, take?: string): Promise<User[]>;
  create(data: any): Promise<any>;
  disable(id: string, email: string): Promise<any>;
  enable(id: string, email: string): Promise<any>;
  getLoggedUser(): Promise<LoggedUser>;
}

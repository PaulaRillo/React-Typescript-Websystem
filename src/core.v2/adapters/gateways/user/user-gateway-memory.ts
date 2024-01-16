import { LoggedUserMapperInterface } from 'core.v2/adapters/mappers/logged-user/logged-user-mapper.interface';
import { MapperFactoryInterface } from 'core.v2/adapters/mappers/mapper-factory.interface';
import { Role } from 'core.v2/domain/logged-user/types/role';
import { User } from 'core.v2/domain/user/entity/user';
import { Store } from 'core.v2/drivers/utils/Store/store';
import { StorageKey } from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import { LoggedUser } from '../../../../../src/core.v2/domain/logged-user/entity/logged-user';
import { storageMemory } from './../../../drivers/utils/Storage/storage-memory';
import { UserGatewayInterface } from './user-gateway.interface';

export class UserGatewayMemory implements UserGatewayInterface {
  private readonly loggedUserMapper: LoggedUserMapperInterface;

  constructor(
    private readonly mapperFactory: MapperFactoryInterface,
    private readonly store: Store
  ) {
    this.loggedUserMapper = this.mapperFactory.createLoggedUserMapper();
  }

  async disable(id: string): Promise<any> {
    return await Promise.resolve();
  }

  async enable(id: string): Promise<any> {
    return await Promise.resolve();
  }  

  private async getLoggedUserRole(loggedUserId: string): Promise<Role> {
    const storageRole = storageMemory.get(StorageKey.USER_ROLE); //TODO: should invert dependency
    if (storageRole) {
      return JSON.parse(storageRole) as Role;
    }

    const role = {
      id: '123',
      name: 'Admin',
      granted_set: 1,
      permissions: {
        //bill
        VIEW_BILL: true,
        MANAGE_BILL: true,
        PAY_BILL: true,
        COMMENT_BILL: false,
        //vendor
        VIEW_VENDOR: true,
        MANAGE_VENDOR: true,
        //report
        VIEW_REPORT: true,
        CREATE_REPORT: false,
        EXPORT_REPORT: true,
        //company
        VIEW_COMPANY: true,
        MANAGE_COMPANY: true,
        //connection
        VIEW_INTEGRATION: true,
        MANAGE_CONNECTION: true,
        EXECUTE_CONNECTION_SYNC: true,
        //settings
        VIEW_APPROVAL_WORKFLOW: true,
        MANAGE_APPROVAL_WORKFLOW: true,
        VIEW_USER: true,
        MANAGE_USER: false,
        VIEW_ROLE: true,
        MANAGE_ROLE: true,
        VIEW_GROUP: true,
        MANAGE_GROUP: true
      }
    };
    storageMemory.set(StorageKey.USER_ROLE, JSON.stringify(role));
    return role;
  }

  async getLoggedUser(): Promise<LoggedUser> {
    const cognitoUser = {
      username: '123',
      attributes: {
        name: 'John Doe',
        email: 'john@doe.com',
        sub: '123',
        preferredMFA: 'SMS_MFA'
      }
    };
    const mappedUser = this.loggedUserMapper.toDomain(cognitoUser);
    const role = await this.getLoggedUserRole(mappedUser.id);
    const mfaEnabled = cognitoUser.attributes.preferredMFA !== 'NOMFA';
    const loggedUser = LoggedUser.getInstance(
      mappedUser.id,
      mappedUser.name,
      mappedUser.email,
      mappedUser.sub,
      role,
      mfaEnabled
    );
    this.store.setLoggedUser(loggedUser);
    return loggedUser;
  }

  async find(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async list(): Promise<any> {
    throw new Error('Method not implemented.');
  }

  async create(data: any): Promise<any> {
    throw new Error('Method not implemented.');
  }
}

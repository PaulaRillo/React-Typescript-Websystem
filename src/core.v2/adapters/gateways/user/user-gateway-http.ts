import { CognitoUser } from 'features/auth';
import {
  AwsApiName,
  StorageKey
} from '../../../../../src/core.v2/domain/@shared/settings/constants.enum';
import { LoggedUser } from '../../../../../src/core.v2/domain/logged-user/entity/logged-user';
import { LoggedUserMapperInterface } from '../../../adapters/mappers/logged-user/logged-user-mapper.interface';
import { MapperFactoryInterface } from '../../../adapters/mappers/mapper-factory.interface';
import { UserMapperInterface } from '../../../adapters/mappers/user/user-mapper.interface';
import type { HttpClientInterface } from '../../../domain/@shared/infra/http-client.interface';
import { Role } from '../../../domain/logged-user/types/role';
import { User } from '../../../domain/user/entity/user';
import { UserFactory } from '../../../domain/user/factory/user-factory';
import { UserFactoryProps } from '../../../domain/user/factory/user-factory.props';
import { AuthInterface } from '../../../drivers/auth/auth.interface';
import { HttpClientFactoryInterface } from '../../../drivers/httpClient/http-client-factory.interface';
import { Store } from '../../../drivers/utils/Store/store';
import { storageMemory } from './../../../drivers/utils/Storage/storage-memory';
import { UserGatewayInterface } from './user-gateway.interface';

export class UserGatewayHttp implements UserGatewayInterface {
  private readonly endpoint: string;
  private readonly httpClientSharedService: HttpClientInterface;
  private readonly httpClientBillTally: HttpClientInterface;
  private readonly userMapper: UserMapperInterface;
  private readonly loggedUserMapper: LoggedUserMapperInterface;

  constructor(
    private readonly auth: AuthInterface,
    private readonly mapperFactory: MapperFactoryInterface,
    private readonly httpClientFactory: HttpClientFactoryInterface,
    private readonly store: Store
  ) {
    this.userMapper = this.mapperFactory.createUserMapper();
    this.endpoint = '/users';
    this.loggedUserMapper = this.mapperFactory.createLoggedUserMapper();
    this.httpClientSharedService = this.httpClientFactory.createHttpClient(AwsApiName.SHARED_SERVICES); //prettier-ignore
    this.httpClientBillTally = this.httpClientFactory.createHttpClient(AwsApiName.BILLTALLY); //prettier-ignore
    this.loggedUserMapper = this.mapperFactory.createLoggedUserMapper();
  }

  async disable(id: string, email: string): Promise<any> {
    return await this.httpClientBillTally.post(
      `${this.endpoint}/${id}/disable`,
      {
        userEmail: email
      }
    );
  }

  async enable(id: string, email: string): Promise<any> {
    return await this.httpClientBillTally.post(
      `${this.endpoint}/${id}/enable`,
      {
        userEmail: email
      }
    );
  }

  async find(userId: string): Promise<User> {
    const userData = await this.httpClientBillTally.get(
      `${this.endpoint}/${userId}`
    );

    const userMapped = this.userMapper.toDomain(userData);
    return UserFactory.create(userMapped);
  }

  async list(): Promise<User[]> {
    const response = await this.httpClientBillTally.get<any[]>(this.endpoint);

    const userMappedList: UserFactoryProps[] = response?.map((user: any) =>
      this.userMapper.toDomain(user)
    );

    return userMappedList.map((user) => {
      return UserFactory.create(user);
    });
  }

  async create(data: any): Promise<any> {
    return await this.httpClientBillTally.post(`${this.endpoint}`, data);
  }

  private async getLoggedUserRole(loggedUserId: string): Promise<Role> {
    const endpoint = `/users/${loggedUserId}/software/BILLTALLY/authorizations`;
    const storageRole = storageMemory.get(StorageKey.USER_ROLE); //TODO: should invert dependency
    if (storageRole) {
      return JSON.parse(storageRole) as Role;
    }
    const { role } = await this.httpClientSharedService.get<{ role: Role }>(
      endpoint
    );
    storageMemory.set(StorageKey.USER_ROLE, JSON.stringify(role));

    return role;
  }

  async getLoggedUser(): Promise<LoggedUser> {
    const cognitoUser: CognitoUser = await this.auth.getAuthUser();
    const mappedUser = this.loggedUserMapper.toDomain(cognitoUser);
    const role = await this.getLoggedUserRole(mappedUser.id);
    const mfaEnabled = cognitoUser?.preferredMFA !== 'NOMFA';
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
}

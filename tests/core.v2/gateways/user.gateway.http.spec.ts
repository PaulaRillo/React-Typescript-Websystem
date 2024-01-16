import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { UserGatewayInterface } from '../../../src/core.v2/adapters/gateways/user/user-gateway.interface';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { LoggedUser } from '../../../src/core.v2/domain/logged-user/entity/logged-user';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';

describe('UserGatewayHttp', () => {
  jest.setTimeout(200000);
  let userGateway: UserGatewayInterface;

  beforeAll(async () => {
    jest.clearAllMocks();
    await serverInit();
    const httpClientFactory = new HttpClientFactory();
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryHttp(
      auth,
      httpClientFactory,
      mapperFactory,
      store
    );

    userGateway = gatewayFactory.createUserGateway();
  });

  test('Should get a loggedUser', async () => {
    const loggedUser = await userGateway.getLoggedUser();

    expect(loggedUser).toBeDefined();
    expect(loggedUser).toBeInstanceOf(LoggedUser);

    expect(loggedUser.id).toBe(`34c567b3-a694-4654-a16f-a58a8c4aac6b`);
    expect(loggedUser.name).toBe(`Raphael Santos`);
    expect(loggedUser.email).toBe(`rsantos@hcoadvisors.com`);
    expect(loggedUser.sub).toBe(`34c567b3-a694-4654-a16f-a58a8c4aac6b`);

    expect(loggedUser.role).toBeDefined();
    expect(loggedUser.role.name).toBe('Administrator');
  });

  test('Should store loggedUser', async () => {
    await userGateway.getLoggedUser();
    expect(store.loggedUser).toBeDefined();
    expect(store.loggedUser).toBeInstanceOf(LoggedUser);
    expect(store.loggedUser.id).toBeDefined();
    expect(store.loggedUser.email).toBe('rsantos@hcoadvisors.com');
  });

  test('Should find a user', async () => {
    const userId = '34c567b3-a694-4654-a16f-a58a8c4aac6b';
    const user = await userGateway.find(userId);

    expect(user.id).toBe('34c567b3-a694-4654-a16f-a58a8c4aac6b');
  });

  test('Should list users', async () => {
    const response = await userGateway.list();

    expect(response).toBeDefined();
    expect(response.data.length).toBeGreaterThan(0);

    response.data.forEach((element) => {
      expect(element.id).toBeDefined();
      expect(element.externalId).toBeDefined();
    });
  });
});

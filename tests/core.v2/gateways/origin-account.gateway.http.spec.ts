import { GatewayFactoryHttp } from '../../../src/core.v2/adapters/gateways/gateway-factory-http';
import { MapperFactory } from '../../../src/core.v2/adapters/mappers/mapper-factory';
import { OriginAccountGatewayInterface } from '../../../src/core.v2/domain/origin-account/gateway/origin-account-gateway.interface';
import { HttpClientFactory } from '../../../src/core.v2/drivers/httpClient/http-client-factory';
import { store } from '../../../src/core.v2/drivers/utils/Store/store';
import { auth, serverInit } from '../../utils/serverInit';

describe('OrderGatewayHttp', () => {
  jest.setTimeout(200000);

  let originAccountGateway: OriginAccountGatewayInterface;

  beforeAll(async () => {
    await serverInit();
    const httpClientFactory = new HttpClientFactory();
    const mapperFactory = new MapperFactory();
    const gatewayFactory = new GatewayFactoryHttp(
      auth,
      httpClientFactory,
      mapperFactory,
      store
    );

    originAccountGateway = gatewayFactory.createOriginAccountGateway();
  });

  test.skip('Should get a origin account list', async () => {
    const originAccountList = await originAccountGateway.list();
    expect(originAccountList).toBeDefined();
    expect(originAccountList.length).toBeGreaterThan(0);

    const originAccount = originAccountList[0];
    expect(originAccount).toBeDefined();

    expect(originAccount.paymentMethodId).toBe('6d2e44cb-798a-4359-94b6-2ed71fecc42e'); // prettier-ignore
    expect(originAccount.balanceInLocalCurrency).toBe(2199.84);
  });
});

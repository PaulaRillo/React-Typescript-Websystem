import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { GetRoles } from '../../../../src/core/application/roles/GetRoles';
import { server } from '../../../setup/server';
import { auth } from '../../../../src/core/infra/auth';

describe('GetRoles', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get roles', async () => {
    const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
    const getRoles = new GetRoles(httpClient);

    const roles = await getRoles.execute();

    expect(roles).toBeDefined();
  });
});

import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { ChangeRole } from '../../../../src/core/application/roles/ChangeRole';
import { server } from '../../../setup/server';
import { auth } from '../../../../src/core/infra/auth';

describe('ChangeRole', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should change the role for a specific user', async () => {
    const userId = 'a25b16ed-cf3f-473c-b315-87e257494b57';
    const roleId = 'BILLTALLY_ADMINISTRATOR';
    const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
    const changeRole = new ChangeRole(httpClient);

    const role = await changeRole.execute({ userId, roleId });

    console.log(role);

    expect(role).toBeDefined();
  });
});

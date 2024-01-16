import { auth } from '../../../../src/core/infra/auth';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { GetUsers } from '../../../../src/core/application/users/GetUsers';
import { server } from '../../../setup/server';

describe('GetUsers', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a list of users', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getUsers = new GetUsers(httpClient);

    const users = await getUsers.execute();

    expect(users[0].username).toBe('user1@email.com');
  });
});

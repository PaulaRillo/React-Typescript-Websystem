import { GetAuthorizations } from './../../../../src/core/application/roles/GetAuthorizations';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { server } from '../../../setup/server';
import { auth } from '../../../../src/core/infra/auth';

describe('GetAuthorizations', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a list of authorizations', async () => {
    const userId = '1309eb59-6d0a-41f4-90b6-1e15ee00fbf8';
    const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
    const getAuthorizations = new GetAuthorizations(httpClient);

    const authorizations = await getAuthorizations.execute(userId);

    console.log(authorizations);

    expect(authorizations).toBeDefined();
  });
});

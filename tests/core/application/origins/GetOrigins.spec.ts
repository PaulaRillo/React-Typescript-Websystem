import { GetOrigins } from './../../../../src/core/application/origins/GetOrigins';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { getOrigins } from '../../../../src/shared/api/requests/getOrigins';
import { server } from '../../../setup/server';
import { auth } from '../../../../src/core/infra/auth';

describe('GetOrigins', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get origins', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getOrigins = new GetOrigins(httpClient);

    const origins = await getOrigins.executeMockData();

    expect(origins[0].paymentMethodId).toBe('12');
  });

  test('Should get origins function', async () => {
    const origins = await getOrigins();
    expect(origins[0].paymentMethodId).toBe('12');
  });
});

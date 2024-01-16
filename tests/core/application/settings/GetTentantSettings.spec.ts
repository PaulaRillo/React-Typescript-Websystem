import { auth } from '../../../../src/core/infra/auth';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { server } from '../../../setup/server';
import { GetTenantSettings } from './../../../../src/core/application/settings/GetTenantSettings';

describe('GetTenantSettings', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get tenant settings', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getTenantSettings = new GetTenantSettings(httpClient);

    const tenantSettings = await getTenantSettings.execute();

    console.log(tenantSettings);

    expect(tenantSettings).toBeDefined();
  });
});

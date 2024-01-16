import { auth } from '../../../../src/core/infra/auth';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { getVendors } from '../../../../src/shared/api/requests/getVendors';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { GetVendorsList } from '../../../../src/core/application/vendors/GetVendorsList';
import { server } from '../../../setup/server';

describe('GetVendorsList', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a vendors list', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getVendorsList = new GetVendorsList(httpClient);

    const vendors = await getVendorsList.execute();

    expect(vendors.data.length).toBeGreaterThan(0);
    expect(vendors.data[0].id).toBe('195b360e-0a6c-4663-b54e-e3e47ae03694');
  });

  test('Should get a vendors list using getVendors request function', async () => {
    const vendors = await getVendors();

    expect(vendors[0].id).toBe('195b360e-0a6c-4663-b54e-e3e47ae03694');
  });
});

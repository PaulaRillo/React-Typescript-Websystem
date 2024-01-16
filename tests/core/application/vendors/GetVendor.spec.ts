import { GetVendor } from './../../../../src/core/application/vendors/GetVendor';
import { auth } from '../../../../src/core/infra/auth';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { server } from '../../../setup/server';
import { getVendor } from '../../../../src/shared/api/requests/getVendor';

describe('GetVendor', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a vendor by id', async () => {
    const vendorId = '141049158';
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getVendor = new GetVendor(httpClient, vendorId);

    const vendor = await getVendor.execute();

    expect(vendor.name).toBe('Stark Cloud');
  });

  test('Should get a vendor using getVendor request function', async () => {
    const vendorId = '141049158';

    const vendor = await getVendor(vendorId);

    expect(vendor.name).toBe('Stark Cloud');
  });
});

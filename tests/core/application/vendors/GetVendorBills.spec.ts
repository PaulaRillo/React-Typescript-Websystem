import { GetVendorBills } from './../../../../src/core/application/vendors/GetVendorBills';
import { auth } from '../../../../src/core/infra/auth';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { server } from '../../../setup/server';
import { getVendorBills } from '../../../../src/shared/api/requests/getVendorBills';

describe('GetVendorBills', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a list of bills from a specific vendor', async () => {
    const vendorId = '141049158';
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getVendorBills = new GetVendorBills(httpClient);

    const bills = await getVendorBills.execute(vendorId);

    expect(bills[0].id).toBe('f31944f3-ad85-42f8-bb9e-b1f62faa3388');
  });

  test('Should get a list of bills using getVendorBills function', async () => {
    const vendorId = '141049158';

    const bills = await getVendorBills(vendorId);

    expect(bills[0].id).toBe('f31944f3-ad85-42f8-bb9e-b1f62faa3388');
  });
});

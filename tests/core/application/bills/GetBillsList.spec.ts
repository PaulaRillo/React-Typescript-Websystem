import { auth } from '../../../../src/core/infra/auth';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { GetBillsList } from '../../../../src/core/application/bills/GetBillsList';
import { server } from '../../../setup/server';
import { getBills } from '../../../../src/shared/api/requests/getBills';

describe('GetBillsList', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a bills list', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getBillsList = new GetBillsList(httpClient);

    const bills = await getBillsList.execute();

    expect(bills).toBeTruthy();
    expect(bills.data.length).toBeGreaterThan(0);
    expect(bills.data[0].id).toBe('0004260b-779a-489f-8333-3acb454bb6ed');
  });

  test('Should get a bills list using getBills request function', async () => {
    const bills = await getBills();

    expect(bills).toBeTruthy();
    expect(bills[0].id).toBe('0004260b-779a-489f-8333-3acb454bb6ed');
  });
});

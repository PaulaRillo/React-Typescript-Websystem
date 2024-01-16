import { GetBill } from './../../../../src/core/application/bills/GetBill';
import { auth } from '../../../../src/core/infra/auth';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { server } from '../../../setup/server';
import { getBill } from '../../../../src/shared/api/requests/getBill';

describe('GetBill', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get a bill by id', async () => {
    const billId = 'INV-001';
    const vendorId = '1b4053ef-3821-44c8-b7e4-85f93170b202';
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getBill = new GetBill(httpClient);

    const bill = await getBill.execute(billId);

    expect(bill.vendorId).toBe(vendorId);
  });

  test('Should get a bill using getBill request function', async () => {
    const billId = 'INV-001';
    const vendorId = '1b4053ef-3821-44c8-b7e4-85f93170b202';

    const bill = await getBill(billId);

    expect(bill.vendorId).toBe(vendorId);
  });
});

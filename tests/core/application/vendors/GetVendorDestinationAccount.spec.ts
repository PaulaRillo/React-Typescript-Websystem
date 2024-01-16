import { GetVendorDestinationAccount } from '../../../../src/core/application/vendors/GetVendorDestinationAccount';
import { auth } from '../../../../src/core/infra/auth';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { server } from '../../../setup/server';

describe('GetVendorOriginDestinationAccount', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should get destination accounts for a specific vendor', async () => {
    const vendorId = 'any_id';
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const getVendorDestinationAccount = new GetVendorDestinationAccount(
      httpClient
    );

    const vendorDestinationAccount =
      await getVendorDestinationAccount.executeMockData(vendorId);

    expect(vendorDestinationAccount).toEqual([
      {
        paymentMethodId: '25',
        bankName: 'French Bank',
        accountAlias: 'Expenses Account',
        redactedBankAccountNumber: '1111-XXXX-XXXX-9344',
        currencyCode: 'USD',
        vaultPaymentMethodId: 'd849djd'
      },
      {
        paymentMethodId: '26',
        bankName: 'Brazilian Bank',
        accountAlias: 'Food Account',
        redactedBankAccountNumber: '1313-XXXX-XXXX-1285',
        currencyCode: 'BRL',
        vaultPaymentMethodId: 'k2348fj'
      }
    ]);
  });
});

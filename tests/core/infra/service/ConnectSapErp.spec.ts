import { ConnectSapErpInputDTO } from './../../../../src/core/infra/service/settings/ConnectSapErp/ConnectSapErpInputDTO';
import { ConnectSapErp } from '../../../../src/core/infra/service/settings/ConnectSapErp/ConnectSapErp';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { server } from '../../../setup/server';
import { auth } from '../../../../src/core/infra/auth';

describe('ConnectSapErp', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test.skip('Should connect with SAP ERP', async () => {
    const httpClient = new AWSHttpClient(apiName.SHAREDSERVICES);
    const connectSapErp = new ConnectSapErp(httpClient);
    const input: ConnectSapErpInputDTO = {
      host: process.env.SAP_HOST || '',
      dbname: process.env.SAP_DBNAME || '',
      username: process.env.SAP_USERNAME || '',
      password: process.env.SAP_PASSWORD || ''
    };

    const output = await connectSapErp.execute(input);

    expect(output).toBe('Credentials updated successfully');

    const output2 = await connectSapErp.execute(input);

    expect(output2).toBe(
      'This request cannot be called more than once every 10 minutes'
    );
  });
});

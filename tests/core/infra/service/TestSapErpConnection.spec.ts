import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { server } from '../../../setup/server';
import { auth } from '../../../../src/core/infra/auth';
import { TestSapErpConnection } from '../../../../src/core/infra/service/settings/TestSapErpConnection/TestSapErpConnection';
import { TestSapErpConnectionInputDTO } from '../../../../src/core/infra/service/settings/TestSapErpConnection/TestSapErpConnectionInputDTO';

describe('TestSapErpConnection', () => {
  jest.setTimeout(20000);

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should test connection with SAP erp', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const testSapErpConnection = new TestSapErpConnection(httpClient);
    const input: TestSapErpConnectionInputDTO = {
      host: process.env.SAP_HOST || '',
      credentials: {
        dbname: process.env.SAP_DBNAME || '',
        username: process.env.SAP_USERNAME || '',
        password: process.env.SAP_PASSWORD || ''
      }
    };

    const output = await testSapErpConnection.execute(input);

    expect(output).toEqual({
      ok: true,
      code: 'SAP_ERP_TEST_CONNECTION_SUCCESS',
      message: 'Successfully connected to SAP ERP',
      statusText: 'OK'
    });
  });

  test('Should test connection with SAP erp with invalid password', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const testSapErpConnection = new TestSapErpConnection(httpClient);
    const input: TestSapErpConnectionInputDTO = {
      host: process.env.SAP_HOST || '',
      credentials: {
        dbname: process.env.SAP_DBNAME || '',
        username: process.env.SAP_USERNAME || '',
        password: 'invalid_password'
      }
    };

    const output = await testSapErpConnection.execute(input);

    expect(output).toEqual({
      ok: false,
      code: 'SAP_ERP_TEST_CONNECTION_FAILURE',
      message: 'Failed to connect to SAP ERP',
      statusText: 'Fail'
    });
  });
});

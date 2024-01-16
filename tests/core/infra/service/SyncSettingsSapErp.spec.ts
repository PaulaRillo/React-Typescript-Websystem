import { auth } from '../../../../src/core/infra/auth';
import { AWSHttpClient } from '../../../../src/core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../../../src/shared/constants/apiName/apiName';
import { server } from '../../../setup/server';
import { SyncSettingsSapErp } from './../../../../src/core/infra/service/settings/SyncSettingsSapErp/SyncSettingsSapErp';

describe('SyncSettingsSapErp', () => {
  jest.setTimeout(60 * 1000); //1 minute

  beforeAll(async () => {
    server.configure();
    const login = process.env.VITE_BILLTALLY_USERNAME || '';
    const password = process.env.VITE_BILLTALLY_PASSWORD || '';
    await auth.signIn(login, password);
  });

  test('Should sync with SAP ERP', async () => {
    const httpClient = new AWSHttpClient(apiName.BILLTALLY);
    const syncSettingsSapErp = new SyncSettingsSapErp(httpClient);
    try {
      await syncSettingsSapErp.execute();
    } catch (error) {
      expect(error.message).toBeUndefined();
    }
  });
});

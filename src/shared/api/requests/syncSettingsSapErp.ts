import { AWSHttpClient } from 'core/infra/httpClient/AWSHttpClient';
import { SyncSettingsSapErp } from 'core/infra/service/settings/SyncSettingsSapErp/SyncSettingsSapErp';
import { apiName } from 'shared/constants/apiName/apiName';

export const syncSettingsSapErp = async (): Promise<void> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const syncSettingsSapErp = new SyncSettingsSapErp(httpClient);
  return await syncSettingsSapErp.execute();
};

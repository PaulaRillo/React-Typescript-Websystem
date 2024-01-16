import { AWSHttpClient } from '../../../core/infra/httpClient/AWSHttpClient';
import { SyncSapErp } from '../../../core/infra/service/settings/SyncSapErp/SyncSapErp';
import { apiName } from '../../../shared/constants/apiName/apiName';
import { SyncSapErpOutputDTO } from './../../../core/infra/service/settings/SyncSapErp/SyncSapErpOutputDTO';

type Output = SyncSapErpOutputDTO;

export const syncSapErp = async (): Promise<Output> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const syncSapErp = new SyncSapErp(httpClient);
  return await syncSapErp.execute();
};

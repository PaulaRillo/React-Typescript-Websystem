import { ConnectionStatus } from 'core/domain/connection/ConnectionStatus';
import { GetConnectionStatus } from '../../../core/application/connection/GetConnectionStatus';
import { AWSHttpClient } from '../../../core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../constants/apiName/apiName';

export const getConnectionStatus = async (): Promise<ConnectionStatus> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const getConnectionStatus = new GetConnectionStatus(httpClient);
  return await getConnectionStatus.execute();
};

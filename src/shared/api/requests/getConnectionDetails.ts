import { ConnectionDetails } from 'core/domain/connection/ConnectionDetails';
import { GetConnectionDetails } from '../../../core/application/connection/GetConnectionDetails';
import { AWSHttpClient } from '../../../core/infra/httpClient/AWSHttpClient';
import { apiName } from '../../constants/apiName/apiName';

export const getConnectionDetails = async (): Promise<ConnectionDetails> => {
  const httpClient = new AWSHttpClient(apiName.BILLTALLY);
  const getConnectionDetails = new GetConnectionDetails(httpClient);
  return await getConnectionDetails.execute();
};
